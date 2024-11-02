// routes/adminRoutes.js
// backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { createTeacher, createStudent } = require('../controllers/admincontroller');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/admin/create-teacher
// @desc    Admin creates a new Teacher account
// @access  Private/Admin
router.post('/create-teacher', protect, authorize('admin'), createTeacher);

// @route   POST /api/admin/create-student
// @desc    Admin creates a new Student account
// @access  Private/Admin
router.post('/create-student', protect, authorize('admin'), createStudent);

module.exports = router;
