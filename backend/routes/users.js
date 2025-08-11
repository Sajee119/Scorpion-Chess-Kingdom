const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireVerified } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, role, is_verified, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
          isVerified: user.is_verified,
          createdAt: user.created_at
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  authenticateToken,
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
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

    const { firstName, lastName } = req.body;
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (firstName) {
      updateFields.push(`first_name = $${paramCount}`);
      updateValues.push(firstName);
      paramCount++;
    }

    if (lastName) {
      updateFields.push(`last_name = $${paramCount}`);
      updateValues.push(lastName);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    updateFields.push(`updated_at = NOW()`);
    updateValues.push(req.user.id);

    const result = await pool.query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING id, first_name, last_name, email, role, is_verified`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
          isVerified: user.is_verified
        }
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update'
    });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', [
  authenticateToken,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
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

    const { currentPassword, newPassword } = req.body;

    // Get current password hash
    const result = await pool.query(
      'SELECT password_hash FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await pool.query(
      'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [newPasswordHash, req.user.id]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password change'
    });
  }
});

// @route   GET /api/users/enrollments
// @desc    Get user course enrollments
// @access  Private
router.get('/enrollments', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        uc.id,
        uc.enrollment_date,
        uc.completion_date,
        uc.progress_percentage,
        c.id as course_id,
        c.title,
        c.description,
        c.difficulty_level,
        c.duration_hours,
        c.price,
        c.image_url,
        u.first_name as instructor_first_name,
        u.last_name as instructor_last_name
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.id
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE uc.user_id = $1
      ORDER BY uc.enrollment_date DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: {
        enrollments: result.rows.map(row => ({
          id: row.id,
          enrollmentDate: row.enrollment_date,
          completionDate: row.completion_date,
          progressPercentage: row.progress_percentage,
          course: {
            id: row.course_id,
            title: row.title,
            description: row.description,
            difficultyLevel: row.difficulty_level,
            durationHours: row.duration_hours,
            price: row.price,
            imageUrl: row.image_url,
            instructor: row.instructor_first_name ? {
              firstName: row.instructor_first_name,
              lastName: row.instructor_last_name
            } : null
          }
        }))
      }
    });

  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/tournaments
// @desc    Get user tournament participations
// @access  Private
router.get('/tournaments', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        tp.id,
        tp.registration_date,
        tp.status,
        t.id as tournament_id,
        t.name,
        t.description,
        t.start_date,
        t.end_date,
        t.entry_fee,
        t.prize_pool,
        t.status as tournament_status
      FROM tournament_participants tp
      JOIN tournaments t ON tp.tournament_id = t.id
      WHERE tp.user_id = $1
      ORDER BY tp.registration_date DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: {
        participations: result.rows.map(row => ({
          id: row.id,
          registrationDate: row.registration_date,
          status: row.status,
          tournament: {
            id: row.tournament_id,
            name: row.name,
            description: row.description,
            startDate: row.start_date,
            endDate: row.end_date,
            entryFee: row.entry_fee,
            prizePool: row.prize_pool,
            status: row.tournament_status
          }
        }))
      }
    });

  } catch (error) {
    console.error('Get tournaments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    // Delete user enrollments
    await pool.query('DELETE FROM user_courses WHERE user_id = $1', [req.user.id]);
    
    // Delete tournament participations
    await pool.query('DELETE FROM tournament_participants WHERE user_id = $1', [req.user.id]);
    
    // Delete coach profile if exists
    await pool.query('DELETE FROM coaches WHERE user_id = $1', [req.user.id]);
    
    // Delete user
    await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during account deletion'
    });
  }
});

module.exports = router; 