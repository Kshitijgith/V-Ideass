// backend/controllers/adminController.js

const Teacher = require('../models/teacher');
const Student = require('../models/student');

// @desc    Create a new Teacher account
// @route   POST /api/admin/create-teacher
// @access  Private/Admin
exports.createTeacher = async (req, res) => {
  const { name, email, password, qualification, branch,photo } = req.body;
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(qualification)
        console.log(branch)
  // Basic validation
  if (!name || !email || !password || !qualification || !branch) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if Teacher already exists
    let teacher = await Teacher.findOne({ email });
    if (teacher) {
      return res.status(400).json({ message: 'Teacher already exists with this email' });
    }

    // Create new Teacher instance
    teacher = new Teacher({
      name,
      email,
      password,
      qualification,
      branch,
      photo
    });

    // Save Teacher to the database (password hashing is handled in the schema)
    await teacher.save();

    // Respond with the created Teacher details (excluding password)
    res.status(201).json({
      message: 'Teacher created successfully',
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        qualification: teacher.qualification,
        branch: teacher.branch,
        photo:teacher.photo
      },
    });
  } catch (error) {
    console.error('Error creating Teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new Student account
// @route   POST /api/admin/create-student
// @access  Private/Admin
exports.createStudent = async (req, res) => {
  const { studentName, email, password, branch, div, rollNo } = req.body;

  // Basic validation
  if (!studentName || !email || !password || !branch || !div ||!rollNo) {
    console.log(studentName)
    console.log(email)
    console.log(password)
    console.log(branch)
    console.log(div)
    console.log(rollNo)
    console.log('provide all')
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if Student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }

    // Check if Roll Number is unique
    student = await Student.findOne({ rollNo });
    if (student) {
      return res.status(400).json({ message: 'Roll number already in use' });
    }

    // Create new Student instance
    student = new Student({
      studentName,
      email,
      password,
      branch,
      div,
      rollNo,
    });

    // Save Student to the database (password hashing is handled in the schema)
    await student.save();

    // Respond with the created Student details (excluding password)
    res.status(201).json({
      message: 'Student created successfully',
      student: {
        id: student._id,
        studentName: student.studentName,
        email: student.email,
        branch: student.branch,
        div: student.div,
        rollNo: student.rollNo,
      },
    });
  } catch (error) {
    console.error('Error creating Student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
