// backend/controllers/teacherController.js

const Group = require('../models/group');
const Student = require('../models/Student'); // Import the student model
const Teacher=require('../models/teacher')
const bcrypt = require('bcryptjs');
/**
 * @desc    Create a project group
 * @route   POST /api/teacher/groups
 * @access  Private (only authenticated teachers can access this)
 */
const createGroup = async (req, res) => {
  const { groupId, groupMembers, year,guideName} = req.body;
  // console.log(groupId)
  // console.log(guideName);
    //console.log(groupMembers)
    


  // Basic validation
  if (!groupId  || !groupMembers || !year) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if all students are present in the database
    const studentsNotFound = [];

    for (const memberName of groupMembers) {
        // Find the student by name (assuming 'name' is the field in the Student model)
        const student = await Student.findOne({ studentName: memberName });
      
        // If the student is not found, add the name to the not found list
        if (!student) {
          //console.log(memberName);
          //console.log(typeof(memberName));
          studentsNotFound.push(memberName);
        }
      }
      
      // If any students were not found, return a response
      if (studentsNotFound.length > 0) {
        return res.status(404).json({ message: 'The following students do not exist:',studentsNotFound });
      }

    // Create the group
    const group = await Group.create({
      groupId,
      groupMembers,
      groupLeader: groupMembers[0], // Assuming the first student in the array is the group leader
      guideName: req.user.name, // Use the authenticated teacher's name
      year,
      status: false, // Default status
      // Add any additional required fields here
    });
    for (const memberName of groupMembers) {
      // console.log(memberName)
      // Find the student by name and update their groupId
      const updatedStudent = await Student.findOneAndUpdate(
        { studentName: memberName },
        { $push: { groupid: groupId } },
        { new: true }
      );
      
    }
    const updateGuide = await Teacher.findOneAndUpdate(
      { name: req.user.name },
      { $push: { groupID: groupId } },
      { new: true }
    );
    console.log('Guide updated:', req.user.name);
    return res.status(201).json(group); // Return the created group
  
}
   catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const Getgroups = async (req, res) => {
  try {
    const guide = await Teacher.findOne({ email: req.email });
       
    if (!guide) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
  
    // Get the groupid array from the student
    const {groupID} = guide;
      
    if (!groupID || groupID.length === 0) {
      
      return res.status(404).json({ message: 'Student is not part of any project group' });
      
    }
  
    // Find all projects that match any groupId in the groupid array
    const projects = await Group.find({
      groupId: { $in: groupID }
    });
  
    if (!projects || projects.length === 0) {
      console.log(typeof(groupID));
      console.log(groupID);
      return res.status(404).json({ message: 'No projects found for this teachet' });
    }
  
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching project groups:', error);
    return res.status(500).json({ message: 'Server error' });
  }
  
}
const Approve = async (req, res) => {
  try {
    const group = await Group.findOne({ groupId: req.body.groupid });
    if (group) {
      group.status = !group.status; // Toggle the status
      await group.save(); // Save the updated status
      res.status(200).json({ success: true, data: group });
    } else {
      res.status(404).json({ success: false, message: "Group not found" });
    }
  } catch (error) {
    console.error("Error toggling status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
  
}
const UpdateProfile=async(req,res)=>{
  try{
    const{Name,password,journe,Photo,Qualification}=req.body;
    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(password, salt);
    const response = await Teacher.findOneAndUpdate(
      { email: Name }, // Query to find the document
      { 
        password: Password,
        qualification: Qualification, 
        journey: journe, 
        photo: Photo 
      }, // Update object
      { new: true } // Options, e.g., to return the updated document
    );
    
    if(response){
      res.json({success:true,data:'Profile Update Successfully'})
    }
    
  }
catch(error){
console.error('Error Updating Profile',error);
res.status(500).json({success:false,message:'Internal Server Error'})
}  
}

const Teacherinfo=async(req,res)=>{
  try{
      const {Name}=req.body;
      const teacher=await Teacher.findOne({email:Name})
      if(teacher){
          res.json({success:true,data:teacher});
      }
      else{
          res.json('NO teacher Found')
      }
  }
  catch(error){
      console.error('Error ocured',error);
      res.status(500).json({success:false,message:'Internal Server Error'})

  }
}

module.exports = {createGroup,Getgroups,Approve,UpdateProfile,Teacherinfo};


