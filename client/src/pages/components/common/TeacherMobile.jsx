import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Routes,Route,Link} from 'react-router-dom'
import axios from 'axios'
const TeacherMobile = () => {
    const location = useLocation();
    const navigate=useNavigate();
  const { department } = location.state || {};
  const {Role}=location.state||''
  // console.log(Role)
  // console.log(department)
  const currentdept = department;
  const[info,setinfo]=useState([]);
    const fetchResult = async () => {
        try {
          const response = await axios.post('https://v-ideass-1.onrender.com/all/Find-Teacher', {
            dept: department,
          });
          
          if (response.data.success) {
            setinfo(response.data.data);
            console.log(response.data.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
     
      useEffect(() => {
        fetchResult();
      }, [currentdept]); 
      
     

   
  return (
    <div className='h-90p w-100p flex flex-col overflow-y-auto justify-center items-center'>
        
                  <ul className=" shadow-inner rounded-md h-80p w-80p items-center flex flex-col" >
                    {info.map((teacher, idx) => (
                      <button onClick={()=>{ navigate(`/${Role}/TeacherInfo`, { state: { Name: teacher.name } });}}
                        key={idx}
                        className="h-10p w-80p text-white bg-blue-900 flex flex-col items-center hover:bg-gray-100"
                      >
                       <div className='h-90p w-100p text-center'>
                       {teacher.name}
                       </div>
                         
                        <div className='h-10p w-100p bg-gray-300'></div>
                      </button>
                     
                    ))}
                  </ul>
                
    </div>
  )
}

export default TeacherMobile