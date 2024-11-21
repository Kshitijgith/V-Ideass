import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LayoutPanelTop } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const MobileDepartment = ({ toggle,role}) => {
  const navigate = useNavigate();
  const [isDepartmentMenuOpen, setIsDepartmentMenuOpen] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(null); // Track the index of the open department
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState();
  const departments = [
    { name: 'Computer Science', teachers: result },
    { name: 'Information Technology', teachers: result },
    { name: 'Electronics and Telecommunication', teachers: result },
    { name: 'Electronics', teachers: result },
    { name: 'BioMedical', teachers: result },
  ];

  const toggleDepartmentMenu = () => {
    setIsDepartmentMenuOpen((prev) => !prev);
    setOpenDepartment(null); // Close any open submenus
   
  };

  const toggleSubMenu = (index) => {
    const selectedDepartment = departments[index];
    
    if (openDepartment) {
      setOpenDepartment(null); // Close submenu if it's already open
    } else {
      setOpenDepartment(index); // Open the submenu
      
     
    }
  
    navigate('Teachers', { state: { department: selectedDepartment.name,Role:role } });
   
    toggle()
   
  };

  return (
    <div className="relative h-100p w-100p ">
      {/* Department Menu Toggle Button */}
      <button
        className="w-full h-full flex items-center  text-white text-start rounded-md"
        onClick={toggleDepartmentMenu}
      >&nbsp;
        <LayoutPanelTop size={18} className="h-60p w-10p text-white" />
        &nbsp;
       Department
      </button>

      {/* Department List */}
      {isDepartmentMenuOpen && (
        <div className="bg-white shadow-md mt-2 rounded-md w-full">
          <ul className="divide-y divide-gray-200">
            {departments.map((department, index) => (
              <li key={index} className="relative">
                {/* Department Name */}
                <button
                  className="w-full text-left px-4 py-3 text-gray-800 font-semibold bg-gray-100 hover:bg-gray-200"
                  onClick={() => toggleSubMenu(index)}
                >
                  {department.name}
                 
                            
                  
                </button>
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileDepartment;
