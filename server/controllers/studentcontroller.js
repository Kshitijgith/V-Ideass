const Student = require('../models/student'); // Import your Student model
const Project = require('../models/group'); // Import your Project model


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
      console.log(typeof(groupid));
      console.log(groupid);
      return res.status(404).json({ message: 'No projects found for this student' });
    }
  
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching project groups:', error);
    return res.status(500).json({ message: 'Server error' });
  }
  
}; 

const UpdateGroup = async (req, res) => {
  try {
    // Extract project information from the request
    const { groupid, projectname, projecttechnology, projectinfo,photos} = req.body;
    
    // Convert uploaded files to base64 strings
    
      console.log(typeof(photos));
      console.log(typeof(groupid));
    // Update the group in MongoDB
    const group = await Project.findOneAndUpdate(
      { groupId: groupid },
      {
        projectName: projectname,
        projectTechnology: projecttechnology,
        projectinfo: projectinfo,
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
    console.error('Error updating project group:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports={getProjectGroup,UpdateGroup}
