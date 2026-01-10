// src/pages/worker/WorkerMyJobs.jsx
import React from "react";

const MyJobs = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">My Jobs</h1>
      <p className="text-gray-600 mb-6">
        View and manage all jobs assigned to you.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-700">Job Title</th>
              <th className="py-2 px-4 text-left text-gray-700">Employer</th>
              <th className="py-2 px-4 text-left text-gray-700">Deadline</th>
              <th className="py-2 px-4 text-left text-gray-700">Status</th>
              <th className="py-2 px-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2 px-4">Frontend Task</td>
              <td className="py-2 px-4">Katel Capital</td>
              <td className="py-2 px-4">2026-01-15</td>
              <td className="py-2 px-4">In Progress</td>
              <td className="py-2 px-4">Update | Mark Complete</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">Backend API Fix</td>
              <td className="py-2 px-4">Katel Capital</td>
              <td className="py-2 px-4">2026-01-18</td>
              <td className="py-2 px-4">Pending</td>
              <td className="py-2 px-4">Update | Mark Complete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs;
