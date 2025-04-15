import axios from 'axios';
import React, { useState } from 'react';

const GenerateReport = () => {
  const [year, setYear] = useState('');

  const generateReport = async (selectedYear) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authorized. Please login first.');
        return;
      }

      const response = await axios({
        method: 'POST',
        url: 'https://v-ideass-1.onrender.com/admin/genrate',
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
    }
  };

  const handleChange = (e) => {
    const selected = e.target.value;
    setYear(selected);
    generateReport(selected);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <label className="mb-2 text-lg font-semibold text-gray-700">
        Select Year to Generate Report
      </label>
      <select
        value={year}
        onChange={handleChange}
        className="p-3 rounded-md border border-gray-400 bg-blue-500 text-white font-semibold text-center cursor-pointer hover:bg-blue-600 transition"
      >
        <option value="2020-2021">2020-2021</option>
        <option value="2021-2022">2021-2022</option>
        <option value="2022-2023">2022-2023</option>
        <option value="2023-2024">2023-2024</option>
        <option value="2024-2025">2024-2025</option>
      </select>
    </div>
  );
};

export default GenerateReport;
