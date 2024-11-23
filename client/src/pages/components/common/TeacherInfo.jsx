import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {Routes,Route,Link} from 'react-router-dom'
import { EllipsisVertical } from 'lucide-react';
const TeacherBoard=()=>{
  const location=useLocation();
  const { Name } = location.state||0
  const [menu, setMenu] = useState('Teacherinfo'); // Default menu state
  const[drop,setdrop]=useState(false)
  console.log(Name);
  console.log(Name)
  const [info,setinfo]=useState('');
  const [groupInfo,setgroupInfo]=useState([]);
const [error,seterror]=useState('')
const set=()=>{
  setdrop(!drop)
    }
    const setmenu=(val)=>{
      setMenu(val);
      setdrop(!drop)
  
    }
  // console.log(Name);
const teacherinfo=async()=>{
  try{
    const response=await axios.post('https://v-ideass.onrender.com/all/Teacher',{
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
const response=await axios.post('https://v-ideass.onrender.com/all/Find-Projects',{
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
    <div className="h-100p w-100p md:flex md:flex-row     ">
      <div className="h-8p w-100p   flex items-center  sm:flex md:hidden bg-blue-500 ">
      <div className='h-100p w-90p text-white text-2xl font-bold   flex items-center justify-center'>
        <div className='h-100p w-20p'></div>
        <div className='h-100p w-90p flex items-center justify-center'>{menu=='Teacherinfo' ? 'TeacherInfo' :'Projects' }</div>

      </div>
      <button
          onClick={() => set()}
          className={`h-100p w-10p ${
            menu === 'groupinfo' ? '' : 'bg-blue-500'
          } md:hidden  h-100p w-20p flex items-center justify-center text-white`}
        >
          <EllipsisVertical size={25} className="mr-3 text-white" />
        </button>

      </div>
      {drop ===true && (
        
        <div className="absolute   h-20p w-80p flex flex-row items-end  md:hidden p-2 z-50">
          <div className='h-100p w-40p'></div>
          <div className='h-100p w-70p flex flex-col items-end '>
          <button
            className=" bg-white h-50p w-80p text-gray-700 hover:bg-gray-200"
            onClick={() => setmenu('Teacherinfo')}
          >
            Teacher Info
          </button>
          <button
            className=" bg-white h-50p w-80p text-gray-700 hover:bg-gray-200"
            onClick={() => setmenu('project')}
          >
            Projects
          </button>
          </div>
          
          
        </div>
      )}
      <div className={`bg-paleBlue h-100p ${menu==='Teacherinfo'?'sm:flex':'sm:hidden'}   w-60p  sm:w-100p  rounded-lg shadow-md flex flex-col  `}>
  {info ? (
   
      
      <div className="w-100p  h-100p flex flex-col items-center justify-start bg-gray-50 shadow-1xl rounded-xl p-6 overflow-auto ">
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


    
  ) : (
    <p className="">Loading teacher information...</p>
  )}
</div>

      <div className='h-100p w-2p sm:hidden'>

      </div>
      <div className={`h-100p w-60p bg-zinc-300  sm:w-100p  ${menu==='project'?'sm:flex':'sm:hidden'} flex flex-col overflow-y-auto bg-white sm:overflow-x-hidden `}>
      {groupInfo.length === 0 ? (
  <p className="text-red-500 font-semibold text-lg">{error}</p>
) : (
  groupInfo && groupInfo.length > 0 ? (
    <>
      <div className="flex flex-row   flex-wrap justify-around h-100p w-100p">
        {groupInfo.map((group, index) => (
          <Link 
          to="/EachGroup" 
          state={{ groupId: group.groupId }} // Pass groupId in the state
          key={index} 
          className="h-70p sm:h-90p  w-50p sm:w-90p  flex-wrap rounded-lg flex sm:flex-col items-center justify-center p-4 m-4 bg-white shadow-lg hover:shadow-xl transition-shadow"
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


