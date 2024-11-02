const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: [true, 'Please add an admin name'],
      trim: true,
    },
  email: {
      type: String,
      required: [true, 'Please add an admin email'],
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
      select: false, // Do not return password by default
    },
  },
  { timestamps: true }
);




// Method to match entered password with hashed password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
   
   console.log(enteredPassword)
   console.log(this.password);
   
   
  return await bcrypt.compare(enteredPassword, this.password);
};

// Prevent OverwriteModelError
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

module.exports = Admin;


