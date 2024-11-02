// backend/controllers/teacherController.js

const Group = require('../models/group');
const Student = require('../models/student'); // Import the student model

/**
 * @desc    Create a project group
 * @route   POST /api/teacher/groups
 * @access  Private (only authenticated teachers can access this)
 */
exports.createGroup = async (req, res) => {
  const { groupId, groupMembers, year,guideName} = req.body;
  console.log(groupId)
    //console.log(groupMembers)
    console.log(year)


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
      console.log(memberName)
      // Find the student by name and update their groupId
      const updatedStudent = await Student.findOneAndUpdate(
        { studentName: memberName },
        { $push: { groupid: groupId } },
        { new: true }
      );
      
    }
    return res.status(201).json(group); // Return the created group
  
}
   catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
