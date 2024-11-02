import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const Admin = () => {
  
const [username,setUsername]=useState();

useEffect(() => {
    
     const token = localStorage.getItem('token');
       
    if (token) {
      
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log(decoded.email);
      setUsername(decoded.email);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <p className="text-lg mb-4">Welcome,{username} You can manage users here.</p>

      {/* Navigation for admin actions */}
      <div className="flex flex-col space-y-4">
        <Link to="CreateStudent" className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition">
          Add Student
        </Link>
        <Link to="CreateTeacher" className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition">
          Add Guide
        </Link>
        <button className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition">
          View All Users
        </button>
      </div>

      {/* This will render the CreateStudent or CreateTeacher component */}
      
    </div>
  );
};

export default Admin;
