// src/pages/admin/AdminReports.jsx
import React from "react";

const Reports = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Reports</h1>
      <p className="text-gray-600 mb-6">
        Access system reports, statistics, and insights for admins.
      </p>
      {/* Example report cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">User Activity</h2>
          <p className="text-gray-600">Monitor user activity logs and recent actions.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">System Metrics</h2>
          <p className="text-gray-600">Check uptime, requests, and system performance.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">Pending Approvals</h2>
          <p className="text-gray-600">View pending requests that require admin approval.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
