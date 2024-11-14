import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const TeacherBoard=()=>{
  const location=useLocation();
  const { Name } = location.state||0
  
  const [info,setinfo]=useState('');
  console.log(Name);
const teacherinfo=async()=>{
  try{
    const response=await axios.post('http://192.168.29.220:3000/all/Teacher',{
      teachername:Name
    })
    if(response){
      setinfo(response.data.data)
      console.log(response.data.data)
      console.log('called')
    }
  }
  catch(error){
console.error('Error getting info',error);
  }
  
}
if(Name!=info.name){
  teacherinfo()
}
useEffect(()=>{
  teacherinfo()
},[])

  return (
    <div className="h-100p w-100p flex ">
      <div className="bg-slate-500 h-90p w-60p rounded-lg shadow-md flex flex-col items-center justify-center p-6">
  {info ? (
    <>
      {/* Display the teacher's photo in a circular frame */}
      <div className="w-60p h-80p mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img
          src={info.photo}
          alt="Teacher Photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Display teacher's name */}
      <h2 className="text-2xl font-bold text-white mb-2">{info.name}</h2>

      {/* Display qualification */}
      <p className="text-gray-200 mb-1">
        <span className="font-semibold">Qualification:</span> {info.qualification}
      </p>

      {/* Display branch */}
      <p className="text-gray-200">
        <span className="font-semibold">Branch:</span> {info.branch}
      </p>
    </>
  ) : (
    <p className="text-gray-500">Loading teacher information...</p>
  )}
</div>

      <div className='h-100p w-2p'>

      </div>
      <div className='h-100p w-60p flex overflow-y-auto  '></div>
    </div>
  );
};

export default TeacherBoard;


