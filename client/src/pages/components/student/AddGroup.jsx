import React, { useState } from 'react';
import axios from 'axios';
import updateGroup from './updateGroup';

const AddProject = ({ id }) => {
  const [groupid, setGroupId] = useState(id);
  const [projectname, setProjectName] = useState('');
  const [projecttechnology, setProjectTechnology] = useState('');
  const [projectinfo, setProjectInfo] = useState('');
  const [ppt, setppt] = useState('');
  const [tags, settags] = useState('');
  const [report, setreport] = useState('');
  const [branch,setbranch]=useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const base64Photos = [];
    // console.log(files.length); // Checking the length

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await convertToBase64(file);
      base64Photos.push(base64);
    }

    setPhotos(base64Photos);
    // console.log(Array.isArray(base64Photos)); // Confirm `base64Photos` is an array
    // console.log(base64Photos); // Log the base64 data to confirm structure
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // console.log(Array.isArray(photos)); // Confirm `photos` is an array
      // console.log(photos); // Log `photos` to check content

      const result = await updateGroup(groupid, projectname, projecttechnology, projectinfo, photos,ppt,report,tags,branch);
      setSuccessMessage('Group updated successfully!');
      // console.log(result);
      
      // Clear the form fields after submission if needed
      
      setProjectName('');
      setProjectTechnology('');
      setProjectInfo('');
      setppt('');
      settags('')
      setreport('');
      setPhotos([]);
      setbranch('');
    } catch (error) {
      setError(error.response.data.message);
      console.error(err);
    }
  };

  return (
    <div className="h-92p w-100p ">
      <div  className="h-10p sm:hidden w-full bg-blue-500  flex items-center justify-center font-semibold">Add Project</div>
      <div className='h-100p w-full flex flex-col overflow-y-auto'>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-paleBlue shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input
            type="text"
            id="projectname"
            value={projectname}
            onChange={(e) => setProjectName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
            Branch
          </label>
          <input
            type="text"
            id="branch"
            value={branch}
            onChange={(e) => setbranch(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectTechnology">
            Project Technology
          </label>
          <input
            type="text"
            id="projecttechnology"
            value={projecttechnology}
            onChange={(e) => setProjectTechnology(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectInfo">
            Project Info
          </label>
          <textarea
            id="projectinfo"
            value={projectinfo}
            onChange={(e) => setProjectInfo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ppt">
            PPT Link
          </label>
          <input
            type="text"
            id="ppt"
            value={ppt}
            onChange={(e) => setppt(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="report">
            Report Link
          </label>
          <input
            type="text"
            id="report"
            value={report}
            onChange={(e) => setreport(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Add Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => settags(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          
          />
        </div>
        

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">
            Upload Photos
          </label>
          <input
            type="file"
            id="photos"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
      </div>
      
    </div>
  );
};

export default AddProject;
