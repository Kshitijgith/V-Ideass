import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {Routes,Route,Link} from 'react-router-dom'

const TeacherBoard=()=>{
  const location=useLocation();
  const { Name } = location.state||0
  
  const [info,setinfo]=useState('');
  const [groupInfo,setgroupInfo]=useState([]);
const [error,seterror]=useState('')
  // console.log(Name);
const teacherinfo=async()=>{
  try{
    const response=await axios.post('http://192.168.29.220:3000/all/Teacher',{
      teachername:Name
    })
    if(response){
      setinfo(response.data.data)
    }
  }
  catch(error){
console.error('Error getting info',error);
  }
  
}
const projectinfo=async()=>{
try{
const response=await axios.post('http://192.168.29.220:3000/all/Find-Projects',{
  teachername:Name
})
if(response.data.data.length>0){
  setgroupInfo(response.data.data);
//   console.log(response.data.data);
 }
 else{
  setgroupInfo([])
  seterror('Project Not Found')
 }
}
catch(error){
  
console.error('Error Occured',error)
}
}
console.log(error);
if(Name!=info.name){
    teacherinfo()
 projectinfo()
 }
useEffect(()=>{
   teacherinfo()
   projectinfo()

},[])

  return (
    <div className="h-100p w-100p flex  ">
      <div className="bg-gray-200 h-100p   overflow-y-auto w-60p rounded-lg shadow-md flex flex-col items-center justify-center p-6">
  {info ? (
    <>
      {/* Display the teacher's photo in a circular frame */}
      <div className="w-100p h-100p flex flex-col items-center justify-start bg-gray-50 shadow-2xl rounded-xl p-6 overflow-auto space-y-6">
  {/* Teacher Photo */}
  <div className="w-40p h-40p rounded-full border-4 border-white shadow-lg  bg-blue-600">
    <img
      src={info.photo}
      alt="Teacher Photo"
      className="w-full h-full rounded-full "
    />
  </div>

  {/* Teacher's Name */}
  <h2 className="text-4xl font-extrabold text-gray-800 text-center tracking-wide">
    {info.name}
  </h2>

  {/* Qualification */}
  <p className="mx-4 p-3 text-lg text-gray-600 bg-gray-100 rounded-md shadow-inner w-50p text-center">
    <span className="font-semibold text-gray-700">Qualification:</span> {info.qualification}
  </p>

  {/* Branch */}
  <p className="mx-4 p-3 text-lg text-gray-600 bg-gray-100 rounded-md shadow-inner w-50p text-center">
    <span className="font-semibold text-gray-700">Branch:</span> {info.branch}
  </p>

  {/* Journey Section */}
  <div className="w-90p p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-bold text-blue-800 mb-2">Journey</h3>
    <p className="text-gray-700 text-justify">
      {info.journey ||
        "This teacher has dedicated their career to nurturing young minds, fostering innovation, and contributing to their field of expertise. With years of experience and numerous accolades, they have inspired countless students to achieve their dreams  hbhbuuujjhbbjbbj hhh."}
    </p>
  </div>
</div>


    </>
  ) : (
    <p className="">Loading teacher information...</p>
  )}
</div>

      <div className='h-100p w-2p'>

      </div>
      <div className='h-100p w-60p flex overflow-y-auto bg-white '>
      {groupInfo.length === 0 ? (
  <p className="text-red-500 font-semibold text-lg">{error}</p>
) : (
  groupInfo && groupInfo.length > 0 ? (
    <>
      <div className="flex flex-row  flex-wrap justify-around h-100p w-100p">
        {groupInfo.map((group, index) => (
          <Link 
          to="/EachGroup" 
          state={{ groupId: group.groupId }} // Pass groupId in the state
          key={index} 
          className="h-90p w-40p  flex-wrap rounded-lg flex flex-col items-center justify-center p-4 m-4 bg-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="bg-slate-200 h-100p w-full rounded-lg p-6 flex flex-col items-center justify-between transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{group.projectName}</h2>
            <div className="h-50p w-full mb-4">
              {group.photos && group.photos.length > 0 ? (
                <img
                  src={group.photos[0]}
                  alt="Project photo"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <p className="text-gray-700 text-center">No photos available</p>
              )}
            </div>
            <div className="text-gray-700 w-full space-y-1">
              
              <p><strong>Group Members:</strong> {group.groupMembers.join(', ')}</p>
              <p><strong>Guide Name:</strong> {group.guideName}</p>
              <p><strong>Year:</strong> {group.year}</p>
            </div>
          </div>
          <div className="h-10p w-full"></div>
        </Link>
        
          
        ))}
       </div>
    </>
  ) : (
    <div className="h-100p w-100p flex justify-center items-center">
      <div className="h-50p w-50p flex space-x-2 justify-center items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  )
)}



      
  
  
      </div>
    </div>
  );
};

export default TeacherBoard;


