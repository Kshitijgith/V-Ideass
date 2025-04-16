
const Group=require('../models/group')
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const genratereport = async (projects) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  const html = `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>V-Ideas Report</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f0f8ff;
      color: #222;
      padding: 0;
      margin: 0;
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

    .cover img {
      width: 180px;
      margin-bottom: 20px;
    }

    .index {
      background: #e0f7fa;
      padding: 30px;
      page-break-after: always;
      border-radius: 10px;
      max-width: 900px;
      margin: 40px auto;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      border: 2px solid #0077b6;
    }

    .index table {
      width: 100%;
      border-collapse: collapse;
    }

    .index th, .index td {
      padding: 10px 16px;
      text-align: left;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }

    .index th:last-child, .index td:last-child {
      border-right: none;
    }

    .index th {
      background-color: #0077b6;
      color: white;
    }

    .index tr:nth-child(even) td {
      background-color: #f9f9f9;
    }

    .index a {
      color: #0077b6;
      text-decoration: none;
    }

    .index a:hover {
      text-decoration: underline;
    }

    .project {
      background: #ffffff;
      margin: 40px auto;
      padding: 30px;
      max-width: 800px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      page-break-before: always;
      border: 2px solid #0077b6;
    }

    .project h2 {
      color: #023e8a;
    }

    .project p {
      line-height: 1.6;
      margin: 10px 0;
    }

    .project-images {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }

    .project-images img {
      width: calc(50% - 10px);
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .links a {
      display: inline-block;
      margin: 10px 10px 0 0;
      padding: 8px 12px;
      background-color: #0077b6;
      color: white;
      text-decoration: none;
      border-radius: 6px;
    }

    .links a:hover {
      background-color: #023e8a;
    }
  </style>
</head>
<body>

  <div class="cover">
    <img src="https://vidyalankar.edu.in/wp-content/uploads/2014/03/VIT.png" />
    <h1>V-Ideas Annual Report</h1>
    <h2>Innovative Student Projects Showcase</h2>
    <p>© <script>document.write(new Date().getFullYear())</script> V-Ideas</p>
  </div>

  <div class="index">
    <h2>Index</h2>
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Page Number</th>
        </tr>
      </thead>
      <tbody>
        <!-- Dynamically generated rows -->
        ${projects.map((p, i) => `
          <tr>
            <td><a href="#project-${i + 1}">${p.projectName}</a></td>
            <td><a href="#project-${i + 1}">Page ${i + 3}</a></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  ${projects.map((p, i) => `
    <div class="project" id="project-${i + 1}">
      <h2>${p.projectName}</h2>
      <p><strong>Guide:</strong> ${p.guideName}</p>
      <p><strong>Group Leader:</strong> ${p.groupLeader}</p>
      <p><strong>Members:</strong> ${p.groupMembers.join(', ')}</p>
      <p><strong>Technologies:</strong> ${p.projectTechnology}</p>
      <p><strong>Branch:</strong> ${p.branch || 'N/A'} | <strong>Year:</strong> ${p.year} ${p.semester ? `| <strong>Semester:</strong> ${p.semester}` : ''}</p>
      <p>${p.projectinfo?.slice(0, 1000) || 'No project info provided.'}</p>

      ${p.photos && p.photos.length > 0 ? `
        <div class="project-images">
          ${p.photos.map(base64 => `<img src="${base64}" />`).join('')}
        </div>
      ` : ''}

      <div class="links">
        ${p.PPT ? `<a href="${p.PPT}" target="_blank">View PPT</a>` : ''}
        ${p.Report ? `<a href="${p.Report}" target="_blank">View Report</a>` : ''}
        ${p.groupMaterial ? `<a href="${p.groupMaterial}" target="_blank">Group Material</a>` : ''}
      </div>
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
    const year=req.body.year;
    const groups = await Group.find({ status: true,year:year });

    // const projects = groups.map(group => ({
    //   title: group.projectName || "No Project Title",
    //   description: group.projectinfo || "No Description",
    //   guide: group.guideName,
    //   members: group.groupMembers || [],
    //   technologies: group.projectTechnology ? [group.projectTechnology] : [],
    //   images: group.photos || [],
    // }));

    const pdfBuffer = await genratereport(groups);

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