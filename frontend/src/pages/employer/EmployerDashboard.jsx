// src/pages/employer/EmployerDashboard.jsx
import React from "react";

const EmployerDashboard = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Employer Dashboard</h1>
      <p className="text-gray-600">
        Welcome! View your job postings, applications, and reports at a glance.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2">Active Jobs</h2>
          <p className="text-gray-600">See how many job postings are currently active.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2">New Applications</h2>
          <p className="text-gray-600">Track new applications submitted by workers.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2">Reports</h2>
          <p className="text-gray-600">Quick access to performance and hiring reports.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
