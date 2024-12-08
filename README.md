# 🚀 V-Ideas

## 📌 Problem Statement
In my college, accessing past project details is challenging due to the fragmented storage system. 📂 Projects like reports and PPTs are kept as hard copies in department offices (e.g., Computer Science, Electronics), making it difficult for students to find specific projects without visiting the departments.

Additionally, project collaboration is inefficient. 🤝 Teachers guide multiple groups (4-5 students each) and rely on WhatsApp for communication, leading to scattered data.

As new groups are created every semester, the number of WhatsApp groups increases significantly, making it harder for teachers and students to manage communication. After the semester ends, the data in these groups, like PPTs and reports, becomes irrelevant and cluttered.

There’s no unified platform to store, manage, and access project data or facilitate communication within groups.

---

## 🌟 Why V-Ideas?
**V-Ideas** solves these problems by offering:

### 🗂️ Centralized Project Storage
- Stores all student projects (reports, PPTs, photos, technologies used) for every academic year and semester.
- Allows students to search for projects by department, teacher, category (e.g., AI, ML), or student name, making access seamless.

### 🤝 Enhanced Collaboration
- Teachers can create and manage project groups with details like group IDs and members.
- Real-time chat enables communication within groups and with guides.
- Ensures all project-related data is organized and easily accessible.

### ✅ Streamlined Approval Workflow
- Teachers approve projects, making them visible to the entire college.
- After approval, students cannot modify materials without the guide’s permission, ensuring data integrity.

### 🔑 Simplified Account Management
- Admins create accounts for students and teachers using official college emails.
- Credentials are emailed to users, enabling a secure onboarding process.
- Includes a "Forgot Password" option for users to reset their credentials conveniently.

---

## ⚙️ Technology Stack

### 🖥️ Backend:
- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** for database management (students, teachers, admins, and groups).
- **JWT** for secure authentication and authorization.
- **Brevo API** for email notifications.
- **Socket.IO** for real-time chat.

### 🌐 Frontend:
- **React.js** for a dynamic and interactive user interface.
- **Tailwind CSS** for styling and ensuring responsiveness.

---

## ✨ Features

### 📁 Centralized Project Repository
- Store and categorize projects for easy access and retrieval.
- View projects based on filters like department, category, or student name.

### 👥 Group Management
- Teachers create groups, monitor progress, and facilitate communication via chat.

### ✔️ Approval and Access Control
- Approved projects are visible to all.
- Modifications require guide approval post-approval, maintaining data integrity.

### 🛠️ Admin Panel
- Admins manage user accounts for students and teachers.
- Credentials are emailed directly for a seamless onboarding experience.

### 📱 User-Friendly Design
- Fully responsive interface with powerful search and filtering options.

