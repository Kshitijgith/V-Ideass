const Student = require('../models/Student'); // Import your Student model
const Project = require('../models/group'); // Import your Project model
const bcrypt = require('bcryptjs');


// Configure Multer to store files temporarily

const getProjectGroup= async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.email });
       
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
  
    // Get the groupid array from the student
    const { groupid } = student;
      
    if (!groupid || groupid.length === 0) {
      
      return res.status(404).json({ message: 'Student is not part of any project group' });
      
    }
  
    // Find all projects that match any groupId in the groupid array
    const projects = await Project.find({
      groupId: { $in: groupid }
    });
  
    if (!projects || projects.length === 0) {
      // console.log(typeof(groupid));
      // console.log(groupid);
      return res.status(404).json({ message: 'No projects found for this student' });
    }
  
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
   
    return res.status(500).json({ message: 'Server error' });
  }
  
}; 

const UpdateGroup = async (req, res) => {
  try {
    // Extract project information from the request
    const { groupid, projectname, projecttechnology, projectinfo,photos,ppt,report,tags} = req.body;
    
    // Convert uploaded files to base64 strings
    
      
    // Update the group in MongoDB
    const group = await Project.findOneAndUpdate(
      { groupId: groupid },
      {
        projectName: projectname,
        projectTechnology: projecttechnology,
        projectinfo: projectinfo,
        PPT:ppt,
        Report:report,
        tags:tags,

        $set: { photos }, // Add photos array to existing ones
      },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    
    return res.status(500).json({ message: 'Server error' });
  }
};
const UpdateProfile = async (req, res) => {
  try {
    const { Email, oldPassword, newPassword } = req.body;
      //  console.log(Email);
      //  console.log(oldPassword);
      //  console.log(newPassword);
    // Find the user by email
    console.log(Email)
    const user = await Student.findOne({ email: Email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Compare the provided old password with the stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    const response = await Student.findOneAndUpdate(
      { email: Email }, // Query to find the document
      { password: hashedNewPassword }, // Update object
      { new: true } // Options, to return the updated document
    );

    if (response) {
      return res.json({ success: true, data: 'Profile updated successfully' });
    }

    return res.status(500).json({ success: false, message: 'Failed to update profile' });
  } catch (error) {
    
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports={getProjectGroup,UpdateGroup,UpdateProfile}
