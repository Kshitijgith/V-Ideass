import axios from 'axios';
import React, { useState } from 'react';
import {ClipboardMinus} from 'lucide-react' ;
const GenerateReport = () => {
  const [year, setYear] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateReport = async (selectedYear) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authorized. Please login first.');
        return;
      }

      setLoading(true);

      const response = await axios({
        method: 'POST',
        url: 'https://v-ideass-1.onrender.com/student/genrate',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { year: selectedYear },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `V-Ideas-Report-${selectedYear}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate report.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (selected) => {
    setYear(selected);
    generateReport(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative h-100p w-100p   text-center" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="sm:hover:bg-blue-600 sm:font-normal sm:justify-start flex items-center justify-center md: hover:bg-blue-950 lg:hover:bg-blue-950 font-extrabold  h-full w-full cursor-pointer">
        <div className='h-full w-full sm:hidden flex items-center justify-center'>Report</div>
         <div className='h-full w-full md:hidden lg:hidden flex items-center justify-start'><ClipboardMinus />&nbsp; Report</div>
      
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full bg-blue-950 text-white border border-gray-300 shadow-md z-10">
          {[
            '2020-2021',
            '2021-2022',
            '2022-2023',
            '2023-2024',
            '2024-2025',
          ].map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-yellow-300 font-semibold cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {loading && (
         <div className="absolute top-full mt-2 left-0 right-0 flex items-center justify-center gap-2 bg-white border border-yellow-500 text-yellow-800 px-4 py-2 rounded shadow-lg font-medium animate-pulse">
         <svg
           className="animate-spin h-5 w-5 text-yellow-500"
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
         >
           <circle
             className="opacity-25"
             cx="12"
             cy="12"
             r="10"
             stroke="currentColor"
             strokeWidth="4"
           />
           <path
             className="opacity-75"
             fill="currentColor"
             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
           />
         </svg>
         Download starting soon...
       </div>
      )}
    </div>
  );
};

export default GenerateReport;
