import React, { useState } from 'react';

const Department=()=> {
  const [isDepartmentMenuOpen, setIsDepartmentMenuOpen] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(null); // Track which department is open

  const departments = [
    { name: 'Computer Science', teachers: ['Alice', 'Bob', 'Carol', 'Jake', 'Maria'] },
    { name: 'Mechanical Engineering', teachers: ['David', 'Eve', 'Frank', 'Liam', 'Olivia'] },
    { name: 'Electrical Engineering', teachers: ['Grace', 'Heidi', 'Ivan', 'Noah', 'Sophia'] },
    { name: 'Civil Engineering', teachers: ['Emma', 'Liam', 'Charlotte', 'Henry', 'Amelia'] },
    { name: 'Chemical Engineering', teachers: ['Lily', 'James', 'Mason', 'Zoe', 'Jack'] },
    { name: 'Aerospace Engineering', teachers: ['Mila', 'Ethan', 'Lucas', 'Ava', 'Mia'] },
    
    
];


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
          className="absolute  w-48 bg-white rounded-md shadow-lg z-10"
          onMouseEnter={() => setIsDepartmentMenuOpen(true)}
          onMouseLeave={() => setIsDepartmentMenuOpen(false)}
        >
          <ul className="h-30p w-full ">
            {departments.map((department, index) => (
              <li
                key={index}
                className="relative px-4 py-2 text-white hover:text-black bg-blue-950 hover:bg-blue-100 cursor-pointer"
                onMouseEnter={() => setOpenDepartment(index)}
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
                          className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                        >
                          {teacher}
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
}

export default Department;
