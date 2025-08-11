const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireVerified, requireRole } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tournaments
// @desc    Get all tournaments with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, search, limit = 10, offset = 0 } = req.query;
    
    let query = `
      SELECT 
        t.id,
        t.name,
        t.description,
        t.start_date,
        t.end_date,
        t.max_participants,
        t.current_participants,
        t.entry_fee,
        t.prize_pool,
        t.status,
        t.created_at,
        COUNT(tp.id) as participant_count
      FROM tournaments t
      LEFT JOIN tournament_participants tp ON t.id = tp.tournament_id
      WHERE 1=1
    `;
    
    const queryParams = [];
    let paramCount = 1;

    if (status) {
      query += ` AND t.status = $${paramCount}`;
      queryParams.push(status);
      paramCount++;
    }

    if (search) {
      query += ` AND (t.name ILIKE $${paramCount} OR t.description ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    query += ` GROUP BY t.id ORDER BY t.start_date ASC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, queryParams);

    res.json({
      success: true,
      data: {
        tournaments: result.rows.map(row => ({
          id: row.id,
          name: row.name,
          description: row.description,
          startDate: row.start_date,
          endDate: row.end_date,
          maxParticipants: row.max_participants,
          currentParticipants: row.current_participants,
          entryFee: row.entry_fee,
          prizePool: row.prize_pool,
          status: row.status,
          createdAt: row.created_at,
          participantCount: parseInt(row.participant_count)
        })),
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total: result.rows.length
        }
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

// @route   GET /api/tournaments/:id
// @desc    Get tournament by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        t.id,
        t.name,
        t.description,
        t.start_date,
        t.end_date,
        t.max_participants,
        t.current_participants,
        t.entry_fee,
        t.prize_pool,
        t.status,
        t.created_at,
        COUNT(tp.id) as participant_count
      FROM tournaments t
      LEFT JOIN tournament_participants tp ON t.id = tp.tournament_id
      WHERE t.id = $1
      GROUP BY t.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found'
      });
    }

    const tournament = result.rows[0];

    res.json({
      success: true,
      data: {
        tournament: {
          id: tournament.id,
          name: tournament.name,
          description: tournament.description,
          startDate: tournament.start_date,
          endDate: tournament.end_date,
          maxParticipants: tournament.max_participants,
          currentParticipants: tournament.current_participants,
          entryFee: tournament.entry_fee,
          prizePool: tournament.prize_pool,
          status: tournament.status,
          createdAt: tournament.created_at,
          participantCount: parseInt(tournament.participant_count)
        }
      }
    });

  } catch (error) {
    console.error('Get tournament error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/tournaments
// @desc    Create a new tournament (admin only)
// @access  Private
router.post('/', [
  authenticateToken,
  requireVerified,
  requireRole(['admin']),
  body('name').trim().isLength({ min: 3, max: 255 }).withMessage('Name must be between 3 and 255 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('maxParticipants').isInt({ min: 2 }).withMessage('Max participants must be at least 2'),
  body('entryFee').isFloat({ min: 0 }).withMessage('Entry fee must be a positive number'),
  body('prizePool').isFloat({ min: 0 }).withMessage('Prize pool must be a positive number'),
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

    const { name, description, startDate, endDate, maxParticipants, entryFee, prizePool } = req.body;

    // Check if end date is after start date
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    const result = await pool.query(
      `INSERT INTO tournaments (name, description, start_date, end_date, max_participants, entry_fee, prize_pool) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, name, description, start_date, end_date, max_participants, entry_fee, prize_pool, status, created_at`,
      [name, description, startDate, endDate, maxParticipants, entryFee, prizePool]
    );

    const tournament = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Tournament created successfully',
      data: {
        tournament: {
          id: tournament.id,
          name: tournament.name,
          description: tournament.description,
          startDate: tournament.start_date,
          endDate: tournament.end_date,
          maxParticipants: tournament.max_participants,
          currentParticipants: tournament.current_participants,
          entryFee: tournament.entry_fee,
          prizePool: tournament.prize_pool,
          status: tournament.status,
          createdAt: tournament.created_at
        }
      }
    });

  } catch (error) {
    console.error('Create tournament error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during tournament creation'
    });
  }
});

// @route   PUT /api/tournaments/:id
// @desc    Update tournament (admin only)
// @access  Private
router.put('/:id', [
  authenticateToken,
  requireVerified,
  requireRole(['admin']),
  body('name').optional().trim().isLength({ min: 3, max: 255 }).withMessage('Name must be between 3 and 255 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
  body('maxParticipants').optional().isInt({ min: 2 }).withMessage('Max participants must be at least 2'),
  body('entryFee').optional().isFloat({ min: 0 }).withMessage('Entry fee must be a positive number'),
  body('prizePool').optional().isFloat({ min: 0 }).withMessage('Prize pool must be a positive number'),
  body('status').optional().isIn(['upcoming', 'ongoing', 'completed', 'cancelled']).withMessage('Invalid status'),
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
    const { name, description, startDate, endDate, maxParticipants, entryFee, prizePool, status } = req.body;

    // Check if tournament exists
    const existingTournament = await pool.query(
      'SELECT id FROM tournaments WHERE id = $1',
      [id]
    );

    if (existingTournament.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found'
      });
    }

    // Update tournament
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (name) {
      updateFields.push(`name = $${paramCount}`);
      updateValues.push(name);
      paramCount++;
    }

    if (description) {
      updateFields.push(`description = $${paramCount}`);
      updateValues.push(description);
      paramCount++;
    }

    if (startDate) {
      updateFields.push(`start_date = $${paramCount}`);
      updateValues.push(startDate);
      paramCount++;
    }

    if (endDate) {
      updateFields.push(`end_date = $${paramCount}`);
      updateValues.push(endDate);
      paramCount++;
    }

    if (maxParticipants) {
      updateFields.push(`max_participants = $${paramCount}`);
      updateValues.push(maxParticipants);
      paramCount++;
    }

    if (entryFee !== undefined) {
      updateFields.push(`entry_fee = $${paramCount}`);
      updateValues.push(entryFee);
      paramCount++;
    }

    if (prizePool !== undefined) {
      updateFields.push(`prize_pool = $${paramCount}`);
      updateValues.push(prizePool);
      paramCount++;
    }

    if (status) {
      updateFields.push(`status = $${paramCount}`);
      updateValues.push(status);
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
      `UPDATE tournaments SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      updateValues
    );

    const tournament = result.rows[0];

    res.json({
      success: true,
      message: 'Tournament updated successfully',
      data: {
        tournament: {
          id: tournament.id,
          name: tournament.name,
          description: tournament.description,
          startDate: tournament.start_date,
          endDate: tournament.end_date,
          maxParticipants: tournament.max_participants,
          currentParticipants: tournament.current_participants,
          entryFee: tournament.entry_fee,
          prizePool: tournament.prize_pool,
          status: tournament.status,
          updatedAt: tournament.updated_at
        }
      }
    });

  } catch (error) {
    console.error('Update tournament error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during tournament update'
    });
  }
});

// @route   POST /api/tournaments/:id/register
// @desc    Register for a tournament
// @access  Private
router.post('/:id/register', [authenticateToken, requireVerified], async (req, res) => {
  try {
    const { id } = req.params;

    // Check if tournament exists and is open for registration
    const tournamentResult = await pool.query(
      'SELECT id, name, max_participants, current_participants, status FROM tournaments WHERE id = $1',
      [id]
    );

    if (tournamentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found'
      });
    }

    const tournament = tournamentResult.rows[0];

    if (tournament.status !== 'upcoming') {
      return res.status(400).json({
        success: false,
        message: 'Tournament is not open for registration'
      });
    }

    if (tournament.current_participants >= tournament.max_participants) {
      return res.status(400).json({
        success: false,
        message: 'Tournament is full'
      });
    }

    // Check if already registered
    const existingRegistration = await pool.query(
      'SELECT id FROM tournament_participants WHERE user_id = $1 AND tournament_id = $2',
      [req.user.id, id]
    );

    if (existingRegistration.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this tournament'
      });
    }

    // Register for tournament
    await pool.query(
      'INSERT INTO tournament_participants (user_id, tournament_id) VALUES ($1, $2)',
      [req.user.id, id]
    );

    // Update participant count
    await pool.query(
      'UPDATE tournaments SET current_participants = current_participants + 1 WHERE id = $1',
      [id]
    );

    res.status(201).json({
      success: true,
      message: 'Successfully registered for tournament',
      data: {
        tournamentId: id,
        tournamentName: tournament.name
      }
    });

  } catch (error) {
    console.error('Tournament registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during tournament registration'
    });
  }
});

// @route   DELETE /api/tournaments/:id
// @desc    Delete tournament (admin only)
// @access  Private
router.delete('/:id', [authenticateToken, requireVerified, requireRole(['admin'])], async (req, res) => {
  try {
    const { id } = req.params;

    // Check if tournament exists
    const existingTournament = await pool.query(
      'SELECT id FROM tournaments WHERE id = $1',
      [id]
    );

    if (existingTournament.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found'
      });
    }

    // Delete participants first
    await pool.query('DELETE FROM tournament_participants WHERE tournament_id = $1', [id]);

    // Delete tournament
    await pool.query('DELETE FROM tournaments WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Tournament deleted successfully'
    });

  } catch (error) {
    console.error('Delete tournament error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during tournament deletion'
    });
  }
});

module.exports = router; 