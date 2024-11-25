import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TeacherMobile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { department } = location.state || {};
  const { Role } = location.state || '';
  
  const currentdept = department;
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchResult = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.post('https://v-ideass-1.onrender.com/all/Find-Teacher', {
        dept: department,
      });

      if (response.data.success) {
        setInfo(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchResult();
  }, [currentdept]);

  return (
    <div className="h-90p w-100p flex flex-col overflow-y-auto justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
        <div className="w-12   h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      ) : (
        <ul className="shadow-inner rounded-md h-80p w-80p items-center flex flex-col">
          {info.map((teacher, idx) => (
            <button
              onClick={() => {
                navigate(`/${Role}/TeacherInfo`, { state: { Name: teacher.name } });
              }}
              key={idx}
              className="h-10p w-80p text-white bg-blue-900 flex flex-col items-center hover:bg-gray-100"
            >
              <div className="h-90p w-100p text-center">{teacher.name}</div>
              <div className="h-10p w-100p bg-gray-300"></div>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherMobile;
