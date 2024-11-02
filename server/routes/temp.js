// backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

dotenv.config();

// Connect to MongoDB mongodb+srv://workkshitij16:database123@cluster0.mongodb.net/Videas?retryWrites=true&w=majority

mongoose.connect("mongodb+srv://workkshitij16:abcd1234@cluster0.htqje95.mongodb.net/Videas?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ adminEmail: 'kk@gmail.com' });
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const password='kk123'
    const hashedPassword = await bcrypt.hash(password, salt);
console.log(password);
    const admin = new Admin({
      adminName: 'kk',
      email: 'kk@gmail.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin created successfully');
    process.exit();
  } catch (error) {
    console.error('Error creating Admin:', error);
    process.exit(1);
  }
};

createAdmin();
