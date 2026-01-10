// src/pages/worker/WorkerDashboard.jsx
import React from "react";

const WorkerDashboard = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Worker Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome! View your current jobs, profile status, and reports at a glance.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2">Assigned Jobs</h2>
          <p className="text-gray-600">See the jobs currently assigned to you.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2">Pending Reports</h2>
          <p className="text-gray-600">Check any pending reports or tasks that require attention.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2">Profile Status</h2>
          <p className="text-gray-600">Review your profile details and update your information.</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
