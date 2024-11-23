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
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach email to request
    req.email = decoded.email;

    // Determine user type and fetch user
    let user;
    switch (decoded.userType) {
      case 'admin':
        user = await Admin.findById(decoded.id).select('-password');
        break;
      case 'teacher':
        user = await Teacher.findById(decoded.id).select('-password');
        break;
      case 'student':
        user = await Student.findById(decoded.id).select('-password');
        break;
      default:
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.user.userType = decoded.userType; // Add userType for authorization
    next();
  } catch (error) {
    console.error('Token verification failed:', error);

    // Differentiate errors for better debugging
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Malformed token' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
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
