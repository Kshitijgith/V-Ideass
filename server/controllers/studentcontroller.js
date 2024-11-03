const Student = require('../models/student'); // Import your Student model
const Project = require('../models/group'); // Import your Project model

exports.getProjectGroup = async (req, res) => {
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
