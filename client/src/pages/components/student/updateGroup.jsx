import axios from 'axios';

const UpdateGroup = async (groupid, projectname, projecttechnology, projectinfo,photos,ppt,report,tags) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    // Set up the request payload
    const data = {
      groupid,
      projectname,
      projecttechnology,
      projectinfo,
      tags,
      photos,
      ppt,
      report
    };

    // Make the POST request to the server
    const response = await axios.post('http://192.168.29.220:3000/student/update-group', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the authorization header with the token
      },
    });

    // Check if the response is successful
    if (response.data.success) {
      console.log('Group updated successfully:', response.data);
      return response.data; // Return data or handle success as needed
    } else {
      console.error('Failed to update group:', response.data.message);
      throw new Error(response.data.message || 'Failed to update group.');
    }
  } catch (err) {
    console.error('Error updating group:', err.message || err);
    throw err; // Rethrow error for further handling if needed
  }
};

export default UpdateGroup;
