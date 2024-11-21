import React, { useState } from 'react';
import axios from 'axios';
import {Routes,Route,Link} from 'react-router-dom'

const Department = () => {
  const [isDepartmentMenuOpen, setIsDepartmentMenuOpen] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(null); // Track the index of the open department
  const [result, setResult] = useState([]);
  const [info,setinfo]=useState();
  const fetchResult = async (deptName) => {
    try {
      const response = await axios.post('http://192.168.29.220:3000/all/Find-Teacher', {
        dept: deptName,
      });
      if (response.data.success) {
        setResult(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const departments = [
    { name: 'Computer Science', teachers: result },
    { name: 'Information Technology', teachers: result },
    { name: 'Electronics and Telecommunication', teachers: result },
    { name: 'Electronics', teachers: result },
    { name: 'BioMedical', teachers: result },
    
  ];

  const handleDepartmentHover = (index) => {
    const selectedDepartment = departments[index];
     setOpenDepartment(index); // Update the open department
    fetchResult(selectedDepartment.name); // Fetch teachers directly with the department name
  };
  const teacherinfo=async(val)=>{
    try{
      const response=await axios.post('http://192.168.29.220:3000/all/Teacher',{
        teachername:val
      })
      if(response){
        setinfo(response.data.data)
        console.log(response.data.data)
      }
    }
    catch(error){
  console.error('Error getting info',error);
    }
    
  }

  return (
    <div className="relative inline-block h-full w-full">
      <button
        className="h-100p w-100p font-extrabold flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950"
        onMouseEnter={() => setIsDepartmentMenuOpen(true)}
        onMouseLeave={() => setIsDepartmentMenuOpen(false)}
      >
        Departments
      </button>

      {isDepartmentMenuOpen && (
        <div
          className="absolute w-48 bg-white rounded-md shadow-lg z-10"
          onMouseEnter={() => setIsDepartmentMenuOpen(true)}
          onMouseLeave={() => setIsDepartmentMenuOpen(false)}
        >
          <ul className="h-30p w-full">
            {departments.map((department, index) => (
              <li
                key={index}
                className="relative px-4 py-2 text-white hover:text-black bg-blue-950 hover:bg-blue-100 cursor-pointer"
                onMouseEnter={() => handleDepartmentHover(index)} // Use arrow function to avoid immediate execution
                onMouseLeave={() => setOpenDepartment(null)}
              >
                {department.name}

                {/* Submenu for teachers */}
                {openDepartment === index && (
                  <div className="absolute left-full top-0 mt-0 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-2">
                      {department.teachers.map((teacher, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 flex  text-gray-700 hover:bg-blue-100 cursor-pointer"
                        >
                         
                          <Link to="TeacherInfo" state={{Name:teacher.name}} className='h-full w-full'>{teacher.name}</Link>
                          
                          
                          
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Department