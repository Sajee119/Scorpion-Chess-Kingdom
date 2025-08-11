const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireVerified } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/coaches
// @desc    Get all coaches with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { specialty, rating, available, search, limit = 10, offset = 0 } = req.query;
    
    let query = `
      SELECT 
        c.id,
        c.bio,
        c.experience_years,
        c.rating,
        c.hourly_rate,
        c.specialties,
        c.is_available,
        c.created_at,
        u.id as user_id,
        u.first_name,
        u.last_name,
        u.email
      FROM coaches c
      JOIN users u ON c.user_id = u.id
      WHERE c.is_available = TRUE
    `;
    
    const queryParams = [];
    let paramCount = 1;

    if (specialty) {
      query += ` AND $${paramCount} = ANY(c.specialties)`;
      queryParams.push(specialty);
      paramCount++;
    }

    if (rating) {
      query += ` AND c.rating >= $${paramCount}`;
      queryParams.push(parseFloat(rating));
      paramCount++;
    }

    if (available !== undefined) {
      query += ` AND c.is_available = $${paramCount}`;
      queryParams.push(available === 'true');
      paramCount++;
    }

    if (search) {
      query += ` AND (u.first_name ILIKE $${paramCount} OR u.last_name ILIKE $${paramCount} OR c.bio ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    query += ` ORDER BY c.rating DESC, c.experience_years DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, queryParams);

    res.json({
      success: true,
      data: {
        coaches: result.rows.map(row => ({
          id: row.id,
          bio: row.bio,
          experienceYears: row.experience_years,
          rating: row.rating,
          hourlyRate: row.hourly_rate,
          specialties: row.specialties,
          isAvailable: row.is_available,
          createdAt: row.created_at,
          user: {
            id: row.user_id,
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email
          }
        })),
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total: result.rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get coaches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/coaches/:id
// @desc    Get coach by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        c.id,
        c.bio,
        c.experience_years,
        c.rating,
        c.hourly_rate,
        c.specialties,
        c.is_available,
        c.created_at,
        u.id as user_id,
        u.first_name,
        u.last_name,
        u.email
      FROM coaches c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Coach not found'
      });
    }

    const coach = result.rows[0];

    res.json({
      success: true,
      data: {
        coach: {
          id: coach.id,
          bio: coach.bio,
          experienceYears: coach.experience_years,
          rating: coach.rating,
          hourlyRate: coach.hourly_rate,
          specialties: coach.specialties,
          isAvailable: coach.is_available,
          createdAt: coach.created_at,
          user: {
            id: coach.user_id,
            firstName: coach.first_name,
            lastName: coach.last_name,
            email: coach.email
          }
        }
      }
    });

  } catch (error) {
    console.error('Get coach error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/coaches
// @desc    Create coach profile
// @access  Private
router.post('/', [
  authenticateToken,
  requireVerified,
  body('bio').trim().isLength({ min: 20 }).withMessage('Bio must be at least 20 characters'),
  body('experienceYears').isInt({ min: 0 }).withMessage('Experience years must be a positive number'),
  body('hourlyRate').isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('specialties').isArray({ min: 1 }).withMessage('At least one specialty is required'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { bio, experienceYears, hourlyRate, specialties } = req.body;

    // Check if user already has a coach profile
    const existingCoach = await pool.query(
      'SELECT id FROM coaches WHERE user_id = $1',
      [req.user.id]
    );

    if (existingCoach.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Coach profile already exists'
      });
    }

    const result = await pool.query(
      `INSERT INTO coaches (user_id, bio, experience_years, hourly_rate, specialties) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, bio, experience_years, rating, hourly_rate, specialties, is_available, created_at`,
      [req.user.id, bio, experienceYears, hourlyRate, specialties]
    );

    const coach = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Coach profile created successfully',
      data: {
        coach: {
          id: coach.id,
          bio: coach.bio,
          experienceYears: coach.experience_years,
          rating: coach.rating,
          hourlyRate: coach.hourly_rate,
          specialties: coach.specialties,
          isAvailable: coach.is_available,
          createdAt: coach.created_at
        }
      }
    });

  } catch (error) {
    console.error('Create coach error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during coach profile creation'
    });
  }
});

// @route   PUT /api/coaches/:id
// @desc    Update coach profile
// @access  Private
router.put('/:id', [
  authenticateToken,
  requireVerified,
  body('bio').optional().trim().isLength({ min: 20 }).withMessage('Bio must be at least 20 characters'),
  body('experienceYears').optional().isInt({ min: 0 }).withMessage('Experience years must be a positive number'),
  body('hourlyRate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('specialties').optional().isArray({ min: 1 }).withMessage('At least one specialty is required'),
  body('isAvailable').optional().isBoolean().withMessage('isAvailable must be a boolean'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { bio, experienceYears, hourlyRate, specialties, isAvailable } = req.body;

    // Check if coach profile exists and user owns it
    const existingCoach = await pool.query(
      'SELECT user_id FROM coaches WHERE id = $1',
      [id]
    );

    if (existingCoach.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Coach profile not found'
      });
    }

    if (existingCoach.rows[0].user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update coach profile
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (bio) {
      updateFields.push(`bio = $${paramCount}`);
      updateValues.push(bio);
      paramCount++;
    }

    if (experienceYears !== undefined) {
      updateFields.push(`experience_years = $${paramCount}`);
      updateValues.push(experienceYears);
      paramCount++;
    }

    if (hourlyRate !== undefined) {
      updateFields.push(`hourly_rate = $${paramCount}`);
      updateValues.push(hourlyRate);
      paramCount++;
    }

    if (specialties) {
      updateFields.push(`specialties = $${paramCount}`);
      updateValues.push(specialties);
      paramCount++;
    }

    if (isAvailable !== undefined) {
      updateFields.push(`is_available = $${paramCount}`);
      updateValues.push(isAvailable);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    updateFields.push(`updated_at = NOW()`);
    updateValues.push(id);

    const result = await pool.query(
      `UPDATE coaches SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      updateValues
    );

    const coach = result.rows[0];

    res.json({
      success: true,
      message: 'Coach profile updated successfully',
      data: {
        coach: {
          id: coach.id,
          bio: coach.bio,
          experienceYears: coach.experience_years,
          rating: coach.rating,
          hourlyRate: coach.hourly_rate,
          specialties: coach.specialties,
          isAvailable: coach.is_available,
          updatedAt: coach.updated_at
        }
      }
    });

  } catch (error) {
    console.error('Update coach error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during coach profile update'
    });
  }
});

// @route   DELETE /api/coaches/:id
// @desc    Delete coach profile
// @access  Private
router.delete('/:id', [authenticateToken, requireVerified], async (req, res) => {
  try {
    const { id } = req.params;

    // Check if coach profile exists and user owns it
    const existingCoach = await pool.query(
      'SELECT user_id FROM coaches WHERE id = $1',
      [id]
    );

    if (existingCoach.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Coach profile not found'
      });
    }

    if (existingCoach.rows[0].user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Delete coach profile
    await pool.query('DELETE FROM coaches WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Coach profile deleted successfully'
    });

  } catch (error) {
    console.error('Delete coach error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during coach profile deletion'
    });
  }
});

// @route   GET /api/coaches/my-profile
// @desc    Get current user's coach profile
// @access  Private
router.get('/my-profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        c.id,
        c.bio,
        c.experience_years,
        c.rating,
        c.hourly_rate,
        c.specialties,
        c.is_available,
        c.created_at,
        u.first_name,
        u.last_name,
        u.email
      FROM coaches c
      JOIN users u ON c.user_id = u.id
      WHERE c.user_id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Coach profile not found'
      });
    }

    const coach = result.rows[0];

    res.json({
      success: true,
      data: {
        coach: {
          id: coach.id,
          bio: coach.bio,
          experienceYears: coach.experience_years,
          rating: coach.rating,
          hourlyRate: coach.hourly_rate,
          specialties: coach.specialties,
          isAvailable: coach.is_available,
          createdAt: coach.created_at,
          user: {
            firstName: coach.first_name,
            lastName: coach.last_name,
            email: coach.email
          }
        }
      }
    });

  } catch (error) {
    console.error('Get my coach profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 