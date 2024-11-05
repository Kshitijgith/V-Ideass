const Project = require('../models/group');

const Showgroups = async (req, res) => {
  try {
    // Find all groups with active status (status: true)
    const activeGroups = await Project.find({ status: true });

    // Send the response with the list of active groups
    res.json({ success: true, data: activeGroups });
  } catch (error) {
    console.error("Error fetching active groups:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const IDgroups = async (req, res) => {
  try {
    // Find all groups with active status (status: true)
    const  {id}  = req.body;
    const activeGroups = await Project.find({ groupId: id });

    
    // Send the response with the list of active groups
    res.json({ success: true, data: activeGroups });
  } catch (error) {
    console.error("Error fetching active groups:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {Showgroups,IDgroups};
