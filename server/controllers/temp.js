const Group = require('../models/group');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
dotenv.config()
const updateGroupYear = async () => {
    mongoose.connect('mongodb+srv://workkshitij16:abcd1234@cluster0.htqje95.mongodb.net/Videas?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      
  try {
    const result = await Group.updateMany(
      { status: true },
      { $set: { year: '2024-2025' } }
    );
    console.log('Updated groups:', );
  } catch (error) {
    console.error('Error updating group year:', error);
  }
};

updateGroupYear();

