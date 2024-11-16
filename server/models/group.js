const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: false
  },
  groupMembers: {
    type: [String],
    required: true
  },
  groupLeader: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: false
  },
  projectTechnology: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
  },
  guideName: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: false
  },
  year: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    default: false
  },
  photos:{
    type:[String]
  },
  projectinfo:{
    type:String,
    required:false
  },
  groupMaterial: {
    type: String,
    required: false
  },
  PPT:{
    type:String,
    required:false
  },
  Report:{
    type:String,
    required:false
  },
  Chats: {
    type: [
        {
            senderName: { type: String, required: true }, 
            message: { type: String, required: true },      
            timestamp: { type: Date, default: Date.now }
               
        }
    ],
    default: []  // Initialize as an empty array by default
}

});
groupSchema.index({
  groupName: 'text',
  projectName: 'text',
  projectTechnology: 'text',
  tags: 'text',
  projectinfo: 'text'
});

module.exports = mongoose.model('Group', groupSchema);
