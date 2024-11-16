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
const GroupChat = async (req, res) => {
  try {
    const  {groupid}  = req.body;
    console.log(groupid);
    const group = await Project.findOne({ groupId: groupid });

    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }
       
    res.json({ success: true, data: group.Chats });
  } catch (error) {
    console.log('not done')
    console.error('Error fetching group chats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const Insertchat = async (req, res) => {
  try {
    const { groupid, senderName, message } = req.body;

    const group = await Project.findOneAndUpdate(
      { groupId: groupid },
      {
        $push: { Chats: { senderName: senderName, message: message, timestamp: new Date() } }
      },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({
      success: true,
      data: group.Chats // Return updated chat array or entire group, as needed
    });
  } catch (error) {
    console.error('Error adding chat message:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
const searchGroups = async (req,res) => {
  try {
    const { query } = req.body; // Get query from body
    const results = await Project.find({
      status:true,
      $text: { $search: query }
    });
    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error in search:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




module.exports = {Showgroups,IDgroups,GroupChat,Insertchat,searchGroups};
