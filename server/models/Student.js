// models/Student.js
// backend/models/Student.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Please add a student name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add a student email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
 
    },
    branch: {
      type: String,
      enum: ['Electronics', 'Computer Science', 'Mechanical', 'Civil', 'Other'], // You can customize the branches
      default: 'Other',
    },
    div: {
      type: String,
      trim: true,
    },
    rollNo: {
      type: String,
      trim: true,
      unique: true,
    },
    groupid:{
      type:[String]
    }
    // Add other student-specific fields if necessary
  },
  { timestamps: true }
);

// Encrypt password using bcrypt before saving
StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to match entered password with hashed password
StudentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Prevent OverwriteModelError
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

module.exports = Student;
