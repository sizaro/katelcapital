// src/pages/employer/EmployerReports.jsx
import React from "react";

const Reports = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Reports</h1>
      <p className="text-gray-600 mb-6">
        Access insights and analytics for your job postings and applications.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">Applications Summary</h2>
          <p className="text-gray-600">Track the number of applications per job posting.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">Hiring Metrics</h2>
          <p className="text-gray-600">View how many applicants were approved, rejected, or pending.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">Performance Reports</h2>
          <p className="text-gray-600">Analyze which jobs attract the most applicants and performance trends.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
