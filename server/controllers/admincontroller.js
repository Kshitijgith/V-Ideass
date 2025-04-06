// backend/controllers/adminController.js

const Teacher = require('../models/teacher');
const Student = require('../models/Student');
const Group=require('../models/group')
const SendEmail=require('./Message')
const bcrypt = require('bcryptjs');
const puppeteer = require('puppeteer');


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
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  
  const html = `
<html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9fbfc;
        color: #333;
        margin: 0;
        padding: 0;
      }

      .cover-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
        color: white;
        text-align: center;
        page-break-after: always;
        padding: 60px 20px;
      }

      .cover-image {
        max-width: 250px;
        height: auto;
        border-radius: 16px;
        margin-bottom: 30px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
      }

      .cover-page h1 {
        font-size: 54px;
        font-weight: bold;
        margin-bottom: 12px;
      }

      .cover-page h2 {
        font-size: 28px;
        font-weight: 300;
        color: #e0e0e0;
      }

      .footer {
        margin-top: 40px;
        font-size: 14px;
        color: #ccc;
      }

      .project {
        background-color: #ffffff;
        max-width: 900px;
        margin: 60px auto;
        padding: 50px;
        border-radius: 16px;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
        page-break-before: always;
        transition: transform 0.3s ease;
      }

      .project:hover {
        transform: translateY(-4px);
      }

      .project h2 {
        font-size: 32px;
        color: #1a3c7a;
        margin-bottom: 20px;
        border-bottom: 2px solid #dbe2ef;
        padding-bottom: 6px;
      }

      .meta-info p {
        margin: 6px 0;
        font-size: 16px;
        font-weight: 500;
      }

      .section-title {
        font-weight: 600;
        color: #333;
        font-size: 18px;
        margin-top: 30px;
        margin-bottom: 10px;
        border-bottom: 2px solid #e2e2e2;
        padding-bottom: 4px;
      }

      .description, .technologies {
        font-size: 16px;
        line-height: 1.7;
        color: #444;
      }

      .images-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 25px;
      }

      .images-grid img {
        width: 48%;
        border-radius: 10px;
        border: 1px solid #ccc;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        object-fit: cover;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .images-grid img:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      @media (max-width: 768px) {
        .images-grid img {
          width: 100%;
        }

        .project {
          padding: 25px;
          margin: 30px 10px;
        }

        .cover-page h1 {
          font-size: 36px;
        }

        .cover-page h2 {
          font-size: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="cover-page">
      <img class="cover-image" src="https://vidyalankar.edu.in/wp-content/uploads/2014/03/VIT.png" alt="Cover Logo" />
      <h1>V-Ideas Annual Report</h1>
      <h2>Innovative Student Projects Showcase</h2>
      <p class="footer">© ${new Date().getFullYear()} V-Ideas. All rights reserved.</p>
    </div>

    ${projects.map(p => `
      <div class="project">
        <h2>${p.title}</h2>
        <div class="meta-info">
          <p><strong>Guide:</strong> ${p.guide}</p>
          <p><strong>Members:</strong> ${p.members.join(', ')}</p>
        </div>
        <div class="description">
          <div class="section-title">Description</div>
          ${p.description}
        </div>
        ${p.PPT && p.Report ? `
  <div style="margin-top: 20px;">
    <a href="${p.PPT}" target="_blank" class="doc-link">📄 PPT</a>
    <a href="${p.Report}" target="_blank" class="doc-link">📘 Report</a>
  </div>
` : ''}
        <div class="technologies">
          <div class="section-title">Technologies Used</div>
          ${p.technologies.join(', ')}
        </div>
        ${p.images.length > 0 ? `
          <div class="section-title">Screenshots</div>
          <div class="images-grid">
            ${p.images.map(img => `<img src="${img}" alt="Project image" />`).join('')}
          </div>
          
        ` : ''}
      </div>
    `).join('')}
  </body>
</html>
`;




  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.pdf({ format: "A4" });
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
      images: group.photos || [] // 
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


