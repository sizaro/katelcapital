// src/pages/worker/WorkerReports.jsx
import React from "react";

const Reports = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Reports</h1>
      <p className="text-gray-600 mb-6">
        View your performance, completed jobs, and pending tasks.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">Completed Jobs</h2>
          <p className="text-gray-600">Track all jobs you have successfully completed.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">Pending Jobs</h2>
          <p className="text-gray-600">Monitor jobs that are currently assigned to you.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold mb-2 text-gray-700">Performance</h2>
          <p className="text-gray-600">Analyze your work performance and productivity trends.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
