// GuideDashboard.js (React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuideDashboard = () => {
  const [projects, setProjects] = useState([]);  // To store all the projects
  const [groupId, setGroupId] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([
    { name: '', email: '', isLeader: true },  // Leader
    { name: '', email: '', isLeader: false },
    { name: '', email: '', isLeader: false },
    { name: '', email: '', isLeader: false },
  ]);
  const [projectName, setProjectName] = useState('');
  const [projectTechnologies, setProjectTechnologies] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [error, setError] = useState('');

  const guideName = "Guide Name"; // Guide name should be fetched based on logged-in guide

  useEffect(() => {
    // Fetch the guide's projects when the component loads
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/routes/guideRoutes/project');
        setProjects(response.data.projects);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/routes/guideRoutes/project', {
        groupId,
        groupName,
        groupMembers,
        projectName,
        projectTechnologies: projectTechnologies.split(','),
        guideName,
        branch,
        year,
        semester,
      });

      setProjects([...projects, response.data.project]);  // Add the new project to the list
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to submit project. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Guide Dashboard</h1>

      {/* Project Submission Form */}
      <form onSubmit={handleProjectSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Add New Project</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Group ID"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          {groupMembers.map((member, index) => (
            <div key={index} className="col-span-2">
              <input
                type="text"
                placeholder={`Group Member ${index + 1} Name`}
                value={member.name}
                onChange={(e) => {
                  const updatedMembers = [...groupMembers];
                  updatedMembers[index].name = e.target.value;
                  setGroupMembers(updatedMembers);
                }}
                required
                className="p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="email"
                placeholder={`Group Member ${index + 1} Email`}
                value={member.email}
                onChange={(e) => {
                  const updatedMembers = [...groupMembers];
                  updatedMembers[index].email = e.target.value;
                  setGroupMembers(updatedMembers);
                }}
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Project Technologies (comma separated)"
            value={projectTechnologies}
            onChange={(e) => setProjectTechnologies(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded shadow-lg hover:bg-purple-700 transition"
        >
          Add Project
        </button>
      </form>

      {/* Projects List */}
      <h2 className="text-3xl font-semibold mt-12 mb-6">My Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold">{project.projectName}</h3>
            <p><strong>Group ID:</strong> {project.groupId}</p>
            <p><strong>Group Members:</strong> {project.groupMembers.map(member => member.name).join(', ')}</p>
            <p><strong>Technologies:</strong> {project.projectTechnologies.join(', ')}</p>
            <p><strong>Branch:</strong> {project.branch}</p>
            <p><strong>Year:</strong> {project.year}</p>
            <p><strong>Semester:</strong> {project.semester}</p>
            <p><strong>Approved:</strong> {project.isApproved ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideDashboard;
