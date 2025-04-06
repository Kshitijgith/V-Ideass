import axios from 'axios';
import React from 'react';

const GenerateReport = () => {
  const generateReport = async () => {
    console.log('executed');
    try {
      const token = localStorage.getItem('token'); // Replace 'token' with your actual key
      if (!token) {
        alert('You are not authorized. Please login first.');
        return;
      }

      const response = await axios({
        method: 'GET',
        url: 'https://v-ideass.onrender.com/admin/genrate',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'V-Ideas-Annual-Report.pdf';
      link.click();

      window.URL.revokeObjectURL(url);

   
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate report.');
    }
  };

  return (
    <div className="h-100p w-100p flex items-center justify-center">
      <button
        className="h-10p w-30p text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-700"
        onClick={generateReport}
      >
        Generate Report
      </button>
    </div>
  );
};

export default GenerateReport;
