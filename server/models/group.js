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
  groupMaterial: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Group', groupSchema);
