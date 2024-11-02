// backend/middleware/auth.js
// backend/middleware/auth.js

// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

dotenv.config();

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.email = decoded.email
      
      // Determine user type and fetch user
      if (decoded.userType === 'admin') {
        req.user = await Admin.findById(decoded.id).select('-password');
        req.user.userType = 'admin'; // Add userType for authorization
      } else if (decoded.userType === 'teacher') {
        req.user = await Teacher.findById(decoded.id).select('-password');
        req.user.userType = 'teacher';
      } else if (decoded.userType === 'student') {
        req.user = await Student.findById(decoded.id).select('-password');
        req.user.userType = 'student';
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
     
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log(token);
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to authorize based on user types
const authorize = (...userTypes) => {
  return (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      return res
        .status(403)
        .json({ message: `User type ${req.user.userType} is not authorized` });
    }
    next();
  };
};

module.exports = { protect, authorize };
