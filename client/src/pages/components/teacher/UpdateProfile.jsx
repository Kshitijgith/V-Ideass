import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UpdateProfile = () => {
  const location = useLocation();
  const { email } = location.state || {};
  console.log(email);
  var token
  const [profileData, setProfileData] = useState({
    Name: email ,
    password: '',
    Qualification: '',
    journe: '',
    Photo: '',
  });
  const[profile,setprofile]=useState('')
  const [photoPreview, setPhotoPreview] = useState('');

  // Fetch token from local storage
  useEffect(() => {
    token = localStorage.getItem('token');
   
    
    console.log(token)

  }, []);

  
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
            'http://192.168.29.220:3000/teacher/Teacherinfo',{
            Name:email,
            },
            {
          headers: { Authorization: `Bearer ${token}` },
            
        });
        console.log(response)
        setprofile(response.data.data);
        setPhotoPreview(response.data.data.photo); // Assuming photo URL comes from backend
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
useEffect(()=>{
    fetchProfileData();
},[])
  
    

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle photo change
  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setProfileData((prevData) => ({
        ...prevData,
        Photo: base64,
      }));
      setPhotoPreview(base64);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://192.168.29.220:3000/teacher/Update-Profile', // Replace with the correct URL
        headers: { Authorization: `Bearer ${token}` },
        data: profileData,
        
      });
      setprofile(profile)
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="h-100p w-100p flex items-center justify-center overflow-y-auto bg-gray-300">
      <form
        className="flex flex-col  overflow-y-auto items-center  rounded-xl justify-center h-90p w-40p bg-white"
        onSubmit={handleUpdateProfile}
      >
        {/* Circular Photo Placeholder */}
        <div className="h-60p w-30p rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
          {photoPreview ? (
            <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <span className="text-gray-500">No Photo</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Photo">
            Upload Photo
          </label>
          <input
            type="file"
            id="Photo"
            name="Photo"
            onChange={handlePhotoChange}
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200"
          />
        </div>
<div className='h-8p'></div>
        {/* Name Input */}
    
        {/* Password Input */}
        <textarea
          name="password"
          value={profileData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="border h-20p w-[80%]  bg-slate-200"
        />
<div className='h-8p'></div>
        {/* Qualification Input */}
        <textarea
          name="Qualification"
          value={profileData.Qualification}
          onChange={handleInputChange}
          placeholder={profile.qualification}
          className="border h-20p w-[80%]  bg-slate-200"
        />
<div className='h-8p'></div>
        {/* Journey Input */}
        <textarea 
          name="journe"
          value={profileData.journe}
          onChange={handleInputChange}
          placeholder={profile.journey}
          className="border h-40p w-[80%] bg-slate-200"
        />
<div className='h-8p'></div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
