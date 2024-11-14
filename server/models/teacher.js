// backend/models/Teacher.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a teacher name'],
      trim: true,
    },
    photo:{
      type: String,
      required:true
    },
    email: {
      type: String,
      required: [true, 'Please add a teacher email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    journey:{
      type:String,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Do not return password by default
    },
    qualification: {
      type: String,
      trim: true,
      default: 'N/A',
    },
    branch: {
      type: String,
      trim: true,
      default: 'N/A',
    },
    groupID:{
      type:[String]
    }
    // Add other teacher-specific fields if necessary
  },
  { timestamps: true }
);

// Encrypt password using bcrypt before saving
TeacherSchema.pre('save', async function (next) {
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
TeacherSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Prevent OverwriteModelError
const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;

