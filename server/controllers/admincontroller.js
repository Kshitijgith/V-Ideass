// backend/controllers/adminController.js

const Teacher = require('../models/teacher');
const Student = require('../models/Student');
const Group=require('../models/group')
const SendEmail=require('./Message')
const bcrypt = require('bcryptjs');
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');


// @desc    Create a new Teacher account
// @route   POST /api/admin/create-teacher
// @access  Private/Admin
exports.createTeacher = async (req, res) => {
  const { name, email, password, branch } = req.body;
        // console.log(name)
        // console.log(email)
        // console.log(password)
        // console.log(branch)
  // Basic validation
  if (!name || !email || !password ) {
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
      branch,
    });

    // Save Teacher to the database (password hashing is handled in the schema)
   
    await SendEmail(
      email, // recipient email
      'Update Your Password', // subject
      `
        <h2>Password Reset Request</h2>
        <p>We have received a request to reset your password. Please use the credentials below to log in and update your password:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><a href="https://v-ideass.vercel.app/reset-password" target="_blank" style="color: #4CAF50; text-decoration: none;">Login to V-Ideas to Update Password</a></p>
        <p>If you did not request this change, please ignore this email.</p>
      `
    );
  await teacher.save();
    //Respond with the created Teacher details (excluding password)
    res.status(201).json({
      message: 'Teacher created successfully',
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        branch: teacher.branch,
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
  const { studentName, email, password,rollNo,branch } = req.body;

  // Basic validation
  if (!studentName || !email || !password||!branch ) {
    // console.log(studentName)
    // console.log(email)
    // console.log(password)
    // console.log(rollNo)
    // console.log('provide all')
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
    console.log('done')
    // Create new Student instance
    student = new Student({
      studentName,
      email,
      password,
      rollNo,
      branch
    });
    await SendEmail(
      email, // recipient email
      'Update Your Password', // subject
      `
        <h2>Password Reset Request</h2>
        <p>We have received a request to reset your password. Please use the credentials below to log in and update your password:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><a href="https://v-ideass.vercel.app/reset-password" target="_blank" style="color: #4CAF50; text-decoration: none;">Login to V-Ideas to Update Password</a></p>
        <p>If you did not request this change, please ignore this email.</p>
      `
    );
    
    // Save Student to the database (password hashing is handled in the schema)
    await student.save();

    // Respond with the created Student details (excluding password)
    res.status(201).json({
      message: 'Student created successfully',
      student: {
        id: student._id,
        studentName: student.studentName,
        email: student.email,
        rollNo: student.rollNo,
        branch:student.branch
      },
    });
  } catch (error) {
    console.error('Error creating Student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const genratePassword=(length)=> {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let Password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    Password += characters[randomIndex];
  }
  return Password
}
exports.ForgotPassword=async(req,res)=>{
try{
  const salt = await bcrypt.genSalt(10);
  const Password=genratePassword(8)
  const Pass=await bcrypt.hash(Password, salt);
const {role,email}=req.body;
const Model = role === 'Student' ? Student : Teacher;
console.log(email);
console.log(Password);
console.log(Pass);
console.log(Model);
const response=await Model.findOneAndUpdate(
  {email:email},
  {password:Pass},
  {new:true}

);
console.log(response);

await SendEmail(
  email, // recipient email
  'Update Your Password', // subject
  `
    <h2>Password Reset Request</h2>
    <p>We have received a request to reset your password. Please use the credentials below to log in and update your password:</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Password:</strong> ${Password}</p>
    <p><a href="https://v-ideass.vercel.app/reset-password" target="_blank" style="color: #4CAF50; text-decoration: none;">Login to V-Ideas to Update Password</a></p>
    <p>If you did not request this change, please ignore this email.</p>
  `
);
console.log('done');
res.json({success:true,message:'Link Shared in email'})
}
catch(error){
// console.error(error,'Error while Reseting Password');
res.status(500).json({success:false,message:'Internal Server Error'})
}
}
const genratereport = async (projects) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  const html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>V-Ideas Report</title>
      <style>
        body {
          font-family: sans-serif;
          background-color: #cceeff;
          color: #222;
          padding: 20px;
        }
        .cover {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
          background: linear-gradient(to right, #0077b6, #023e8a);
          color: white;
          page-break-after: always;
        }
        .index {
          background: #caf0f8;
          padding: 20px;
          page-break-after: always;
        }
        .project {
          background: #0077b6;
          margin: 30px auto;
          padding: 20px;
          max-width: 700px;
          border-radius: 12px;
          color: white;
          page-break-before: always;
        }
      </style>
    </head>
    <body>

      <div class="cover">
        <img src="https://vidyalankar.edu.in/wp-content/uploads/2014/03/VIT.png" width="200" />
        <h1>V-Ideas Annual Report</h1>
        <h2>Innovative Student Projects Showcase</h2>
        <p>© ${new Date().getFullYear()} V-Ideas</p>
      </div>

      <div class="index">
        <h2>Index</h2>
        ${projects.map((p, i) => `
          <p><strong>${p.title}</strong> — Page ${i + 3}</p>
        `).join('')}
      </div>

      ${projects.map((p) => `
        <div class="project">
          <h2>${p.title}</h2>
          <p><strong>Guide:</strong> ${p.guide}</p>
          <p><strong>Members:</strong> ${p.members.join(', ')}</p>
          <p><strong>Technologies:</strong> ${p.technologies.join(', ')}</p>
          <p>${p.description}</p>
        </div>
      `).join('')}

    </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  return buffer;
};

exports.createanaulReport = async (req, res) => {
  try {
    const groups = await Group.find({ status: true });

    const projects = groups.map(group => ({
      title: group.projectName || "No Project Title",
      description: group.projectinfo || "No Description",
      guide: group.guideName,
      members: group.groupMembers || [],
      technologies: group.projectTechnology ? [group.projectTechnology] : [],
      images: group.photos || [],
    }));

    const pdfBuffer = await genratereport(projects);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Videas-Projects.pdf",
    });

    res.end(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return res.status(500).json("Failed to generate PDF");
  }
};


