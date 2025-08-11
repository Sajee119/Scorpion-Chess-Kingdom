const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireVerified, requireRole } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { difficulty, instructor, search, limit = 10, offset = 0 } = req.query;
    
    let query = `
      SELECT 
        c.id,
        c.title,
        c.description,
        c.difficulty_level,
        c.duration_hours,
        c.price,
        c.image_url,
        c.is_active,
        c.created_at,
        u.first_name as instructor_first_name,
        u.last_name as instructor_last_name,
        COUNT(uc.id) as enrollment_count
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN user_courses uc ON c.id = uc.course_id
      WHERE c.is_active = TRUE
    `;
    
    const queryParams = [];
    let paramCount = 1;

    if (difficulty) {
      query += ` AND c.difficulty_level = $${paramCount}`;
      queryParams.push(difficulty);
      paramCount++;
    }

    if (instructor) {
      query += ` AND c.instructor_id = $${paramCount}`;
      queryParams.push(instructor);
      paramCount++;
    }

    if (search) {
      query += ` AND (c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    query += ` GROUP BY c.id, u.first_name, u.last_name ORDER BY c.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, queryParams);

    res.json({
      success: true,
      data: {
        courses: result.rows.map(row => ({
          id: row.id,
          title: row.title,
          description: row.description,
          difficultyLevel: row.difficulty_level,
          durationHours: row.duration_hours,
          price: row.price,
          imageUrl: row.image_url,
          isActive: row.is_active,
          createdAt: row.created_at,
          instructor: row.instructor_first_name ? {
            firstName: row.instructor_first_name,
            lastName: row.instructor_last_name
          } : null,
          enrollmentCount: parseInt(row.enrollment_count)
        })),
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total: result.rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        c.id,
        c.title,
        c.description,
        c.difficulty_level,
        c.duration_hours,
        c.price,
        c.image_url,
        c.is_active,
        c.created_at,
        u.first_name as instructor_first_name,
        u.last_name as instructor_last_name,
        COUNT(uc.id) as enrollment_count
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN user_courses uc ON c.id = uc.course_id
      WHERE c.id = $1 AND c.is_active = TRUE
      GROUP BY c.id, u.first_name, u.last_name`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const course = result.rows[0];

    res.json({
      success: true,
      data: {
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          difficultyLevel: course.difficulty_level,
          durationHours: course.duration_hours,
          price: course.price,
          imageUrl: course.image_url,
          isActive: course.is_active,
          createdAt: course.created_at,
          instructor: course.instructor_first_name ? {
            firstName: course.instructor_first_name,
            lastName: course.instructor_last_name
          } : null,
          enrollmentCount: parseInt(course.enrollment_count)
        }
      }
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/courses
// @desc    Create a new course (admin/instructor only)
// @access  Private
router.post('/', [
  authenticateToken,
  requireVerified,
  requireRole(['admin', 'instructor']),
  body('title').trim().isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('difficultyLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
  body('durationHours').isInt({ min: 1 }).withMessage('Duration must be at least 1 hour'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
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

    const { title, description, difficultyLevel, durationHours, price, imageUrl } = req.body;

    const result = await pool.query(
      `INSERT INTO courses (title, description, difficulty_level, duration_hours, price, image_url, instructor_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, title, description, difficulty_level, duration_hours, price, image_url, created_at`,
      [title, description, difficultyLevel, durationHours, price, imageUrl, req.user.id]
    );

    const course = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: {
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          difficultyLevel: course.difficulty_level,
          durationHours: course.duration_hours,
          price: course.price,
          imageUrl: course.image_url,
          createdAt: course.created_at
        }
      }
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during course creation'
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course (admin/instructor only)
// @access  Private
router.put('/:id', [
  authenticateToken,
  requireVerified,
  requireRole(['admin', 'instructor']),
  body('title').optional().trim().isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('difficultyLevel').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
  body('durationHours').optional().isInt({ min: 1 }).withMessage('Duration must be at least 1 hour'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
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
    const { title, description, difficultyLevel, durationHours, price, imageUrl } = req.body;

    // Check if course exists and user has permission
    const existingCourse = await pool.query(
      'SELECT instructor_id FROM courses WHERE id = $1',
      [id]
    );

    if (existingCourse.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (req.user.role !== 'admin' && existingCourse.rows[0].instructor_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update course
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (title) {
      updateFields.push(`title = $${paramCount}`);
      updateValues.push(title);
      paramCount++;
    }

    if (description) {
      updateFields.push(`description = $${paramCount}`);
      updateValues.push(description);
      paramCount++;
    }

    if (difficultyLevel) {
      updateFields.push(`difficulty_level = $${paramCount}`);
      updateValues.push(difficultyLevel);
      paramCount++;
    }

    if (durationHours) {
      updateFields.push(`duration_hours = $${paramCount}`);
      updateValues.push(durationHours);
      paramCount++;
    }

    if (price !== undefined) {
      updateFields.push(`price = $${paramCount}`);
      updateValues.push(price);
      paramCount++;
    }

    if (imageUrl !== undefined) {
      updateFields.push(`image_url = $${paramCount}`);
      updateValues.push(imageUrl);
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
      `UPDATE courses SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      updateValues
    );

    const course = result.rows[0];

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: {
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          difficultyLevel: course.difficulty_level,
          durationHours: course.duration_hours,
          price: course.price,
          imageUrl: course.image_url,
          updatedAt: course.updated_at
        }
      }
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during course update'
    });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/:id/enroll', [authenticateToken, requireVerified], async (req, res) => {
  try {
    const { id } = req.params;

    // Check if course exists and is active
    const courseResult = await pool.query(
      'SELECT id, title FROM courses WHERE id = $1 AND is_active = TRUE',
      [id]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found or inactive'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await pool.query(
      'SELECT id FROM user_courses WHERE user_id = $1 AND course_id = $2',
      [req.user.id, id]
    );

    if (existingEnrollment.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Enroll in course
    await pool.query(
      'INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2)',
      [req.user.id, id]
    );

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: {
        courseId: id,
        courseTitle: courseResult.rows[0].title
      }
    });

  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during enrollment'
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course (admin/instructor only)
// @access  Private
router.delete('/:id', [authenticateToken, requireVerified, requireRole(['admin', 'instructor'])], async (req, res) => {
  try {
    const { id } = req.params;

    // Check if course exists and user has permission
    const existingCourse = await pool.query(
      'SELECT instructor_id FROM courses WHERE id = $1',
      [id]
    );

    if (existingCourse.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (req.user.role !== 'admin' && existingCourse.rows[0].instructor_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Delete enrollments first
    await pool.query('DELETE FROM user_courses WHERE course_id = $1', [id]);

    // Delete course
    await pool.query('DELETE FROM courses WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during course deletion'
    });
  }
});

module.exports = router; 