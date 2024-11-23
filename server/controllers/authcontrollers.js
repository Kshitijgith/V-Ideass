// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
dotenv.config();

// Helper function to generate JWT Token
const generateToken = (id, email, userType) => {
  return jwt.sign({ id, email, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * @desc    Admin Login
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');
       // console.log(admin);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(admin._id,email, 'admin');

    res.status(200).json({
      token,
      user: {
        id: admin._id,
        adminName: admin.adminName,
        email: admin.email,
      
      },
    });
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
};
/**
 * @desc    Teacher Login
 * @route   POST /api/auth/teacher/login
 * @access  Public
 */
exports.teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password ) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check for teacher
    const teacher = await Teacher.findOne({ email }).select('+password');

    if (!teacher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await teacher.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(teacher._id,email, 'teacher');

    res.status(200).json({
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        qualification: teacher.qualification,
        branch: teacher.branch,
      },
    });
  } catch (error) {
   
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Student Login
 * @route   POST /api/auth/student/login
 * @access  Public
 */
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password ) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check for student
    const student = await Student.findOne({ email }).select('+password');

    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(student._id,email, 'student');

    res.status(200).json({
      token,
      user: {
        id: student._id,
        studentName: student.studentName,
        email: student.email,
        branch: student.branch,
        div: student.div,
        rollNo: student.rollNo,
      },
    });
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
};
