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
    <div className="h-100p , w-10, flex flex-col items-center justify-center bg-slate-300 p-4">
     
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to Videas</h1>
        <p className="text-center text-gray-600 mb-6">Enter your credentials to login</p>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleLogin('student')}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Login as Student'}
            </button>
            <button
              type="button"
              onClick={() => handleLogin('teacher')}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Login as Teacher'}
            </button>
            <button
              type="button"
              onClick={() => handleLogin('admin')}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Login as Admin'}
            </button>
            <Link to="ForgotPassword" className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'>
            Forgot password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}