import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sampleImage from '../assets/logo_vit.png';
import ForgotPassword from './components/common/ForgotPassword';
import {Routes,Route,Link} from 'react-router-dom'
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role,setrole]=useState('student')
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  
  const handleLogin = async (role) => {
    var decoded = 'a';
    if(token){
      decoded=JSON.parse(atob(token.split('.')[1]));
    }
    
        const nemail=decoded.email;
          const nrole=decoded.userType;
      if (token&&role==nrole&&email=='') {
console.log(nemail);
          console.log(nrole)
        try {
          const routeMap = {
            student: '/StudentDashBoard',
            teacher: '/guide',
            admin: `/admin`,
          };
          
          // Use decoded data to set user info or perform any other actions needed
          
          navigate(routeMap[nrole]);
        } catch (error) {
          console.error("Token decoding failed:", error);
          localStorage.removeItem('token'); // Clear token if invalid
        }
      }
    else{
      setIsLoading(true);
      const loginUrlMap = {
        student: 'http://192.168.29.220:3000/auth/student/login',
        teacher: 'http://192.168.29.220:3000/auth/teacher/login',
        admin: 'http://192.168.29.220:3000/auth/admin/login',
      };
  
      try {
        const response = await axios.post(loginUrlMap[role], { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
  
        const routeMap = {
          student: '/StudentDashBoard',
          teacher: '/guide',
          admin: '/admin',
        };
        navigate(routeMap[role]);
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    }
    
  };

  return (
    <div className="h-80p w-30p sm:w-90p sm:h-70p   border rounded-xl flex flex-col justify-center items-center ">

<div className="bg-gray-100 border  rounded-lg shadow-xl w-100p h-100p flex flex-col">
  <div className="h-10p w-100p text-3xl font-bold text-center bg-blue-900 text-white">
    Welcome to Videas
  </div>
  
  <form className="h-90p w-100 ">
  <h1 className="text-xl font-bold text-center text-gray-700 ">
    Login as {role}
  </h1>
    <div className="h-60p w-100p flex flex-col justify-center items-center ">
      <div
        className={`w-100p h-100p d flex flex-col items-center justify-center  ${
          role === 'student'
            ? 'bg-blue-400'
            : role === 'teacher'
            ? 'bg-yellow-400'
            : 'bg-purple-400'
        }`}
      >
        <div className="h-10p w-100p"></div>
        <div className="h-30p w-80p flex flex-col">
          <label
            htmlFor="email"
            className="h-10p w-full text-sm font-medium text-gray-700 flex items-center"
          >
            Email
          </label>
          <div className="h-20p"></div>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-50p w-full px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>
        <div className="h-30p w-80p flex flex-col">
          <label
            htmlFor="password"
            className="h-10p w-full text-sm font-medium text-gray-700 flex items-center"
          >
            Password
          </label>
          <div className="h-20p"></div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-50p w-full px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
            placeholder="Enter Password"
          />
        </div>
        <div className="h-8p"></div>
        <div className="h-20p w-80p flex items-center justify-center">
          <button
            type="button"
            onClick={() => handleLogin(role)}
            className="h-100p w-full bg-blue-900 text-white font-medium rounded-md shadow-sm hover:bg-blue-950 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
    <div
      className={`w-100p h-40p  flex flex-col items-center justify-center  ${
        role === 'student'
          ? 'bg-blue-400'
          : role === 'teacher'
          ? 'bg-yellow-400'
          : 'bg-purple-400'
      }`}
    >
      <div className="h-10p"></div>
      <div className="h-10p"></div>
      <div className="h-30p w-full flex">
        <div className="h-100p w-100p flex justify-around">
          <button
            type="button"
            onClick={() => setrole('student')}
            disabled={isLoading}
            className="w-30p h-100p flex justify-center items-center shadow-sm text-sm font-medium text-gray-800 bg-blue-500 hover:bg-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : ' Student'}
          </button>
          <button
            type="button"
            onClick={() => setrole('teacher')}
            disabled={isLoading}
            className="w-30p h-100p flex justify-center items-center shadow-sm text-sm font-medium text-gray-800 bg-yellow-500 hover:bg-yellow-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : ' Teacher'}
          </button>
          <button
            type="button"
            onClick={() => setrole('admin')}
            disabled={isLoading}
            className="w-30p h-100p flex justify-center items-center shadow-sm text-sm font-medium text-gray-800 bg-purple-500 hover:bg-purple-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Admin'}
          </button>
        </div>
      </div>
      <div className='h-10p'></div>
      <div className="h-20p w-full flex  justify-center items-center">
        <Link to="ForgotPassword"
          disabled={isLoading}
          className="w-50p sm:w-100p h-100p text-xl flex justify-center items-center shadow-sm sm:text-sm font-medium text-gray-800  focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
           Click here to Forgot Password
        </Link>
      </div>
    </div>
  </form>
</div>



     
    </div>
  );
}