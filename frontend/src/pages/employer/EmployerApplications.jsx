// src/pages/employer/EmployerApplications.jsx
import React from "react";

const Applications = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Applications</h1>
      <p className="text-gray-600 mb-6">
        Review applications submitted for your job postings.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-700">Applicant Name</th>
              <th className="py-2 px-4 text-left text-gray-700">Job Title</th>
              <th className="py-2 px-4 text-left text-gray-700">Date Applied</th>
              <th className="py-2 px-4 text-left text-gray-700">Status</th>
              <th className="py-2 px-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2 px-4">Alice Johnson</td>
              <td className="py-2 px-4">Frontend Developer</td>
              <td className="py-2 px-4">2026-01-08</td>
              <td className="py-2 px-4">Pending</td>
              <td className="py-2 px-4">View | Approve | Reject</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">Bob Smith</td>
              <td className="py-2 px-4">Backend Developer</td>
              <td className="py-2 px-4">2026-01-07</td>
              <td className="py-2 px-4">Pending</td>
              <td className="py-2 px-4">View | Approve | Reject</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
