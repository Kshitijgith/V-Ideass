import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuideDashboard from './pages/Guide';
import Admin from './pages/Admin';
import StudentDashboard from './pages/StudentDashboard';
import ForgotPassword from './pages/components/common/ForgotPassword';
import EachGroup from './pages/components/common/Eachgroup';
import VITlogo from './assets/logo_vit.png';
import VIT from './assets/VIT.png';
import axios from 'axios';
const token = localStorage.getItem('token');
var decoded = 'a';
if (token) {
  decoded = JSON.parse(atob(token.split('.')[1]));
}

const App = () => {
  useEffect(() => {
    const warmupServers = async () => {
      try {
        await axios.get('https://v-ideass-1.onrender.com');
        await axios.get('https://v-ideass.onrender.com');
        console.log('Servers warmed up successfully.');
      } catch (error) {
        console.log('Server is not responding:', error.message);
      }
    };

    warmupServers();
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating app loading (e.g., fetching data, initializing state, etc.)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds for demo, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-white flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="h-screen w-screen bg-white flex flex-col">
        <div className="h-10p w-100p bg-blue-950 flex justify-evenly ">
          <div className="w-30p h-100p flex items-center">
            <img className="h-60p w-40p sm:h-60p sm:w-100p" src={VITlogo} alt="VIT Logo" />
          </div>
          <div className="h-100p w-50p flex justify-end items-center ">
            <img className="h-60p w-40p sm:h-50p sm:w-60p" src={VIT} alt="VIT" />
          </div>
        </div>

        <div className="h-90p w-100p bg-paleBlue flex flex-col justify-center items-center overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Eachgroup" element={<EachGroup />} />
            <Route path={`admin/*`} element={<Admin />} />
            <Route path="/StudentDashBoard/*" element={<StudentDashboard />} />
            <Route path="/guide/*" element={<GuideDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
