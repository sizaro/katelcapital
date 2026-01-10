// src/pages/employer/EmployerJobPostings.jsx
import React from "react";

const JobPostings = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Job Postings</h1>
      <p className="text-gray-600 mb-6">
        Create new job postings or manage your existing ones.
      </p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6">
        + Create New Job
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-700">Job Title</th>
              <th className="py-2 px-4 text-left text-gray-700">Location</th>
              <th className="py-2 px-4 text-left text-gray-700">Applications</th>
              <th className="py-2 px-4 text-left text-gray-700">Status</th>
              <th className="py-2 px-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2 px-4">Frontend Developer</td>
              <td className="py-2 px-4">Kampala</td>
              <td className="py-2 px-4">12</td>
              <td className="py-2 px-4">Open</td>
              <td className="py-2 px-4">Edit | Close</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">Backend Developer</td>
              <td className="py-2 px-4">Entebbe</td>
              <td className="py-2 px-4">5</td>
              <td className="py-2 px-4">Open</td>
              <td className="py-2 px-4">Edit | Close</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobPostings;
