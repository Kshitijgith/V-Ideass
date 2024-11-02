// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const {
  adminLogin,
  teacherLogin,
  studentLogin,
} = require('../controllers/authcontrollers');

// Admin Login
// @route   POST /api/auth/admin/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/admin/login', adminLogin);

// Teacher Login
// @route   POST /api/auth/teacher/login
// @desc    Authenticate teacher and get token
// @access  Public
router.post('/teacher/login', teacherLogin);

// Student Login
// @route   POST /api/auth/student/login
// @desc    Authenticate student and get token
// @access  Public
router.post('/student/login', studentLogin);

module.exports = router;
