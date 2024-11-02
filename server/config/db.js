
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true, // Deprecated in newer versions
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    console.log(error)
    process.exit(1);
  }
};

module.exports = connectDB;
