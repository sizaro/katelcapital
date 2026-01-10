// src/pages/admin/AdminManageUsers.jsx
import React from "react";

const ManageUsers = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Manage Users</h1>
      <p className="text-gray-600 mb-6">
        View, add, edit, or remove users from the system.
      </p>
      {/* You can add a table of users here */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-700">Name</th>
              <th className="py-2 px-4 text-left text-gray-700">Email</th>
              <th className="py-2 px-4 text-left text-gray-700">Role</th>
              <th className="py-2 px-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">john@example.com</td>
              <td className="py-2 px-4">Admin</td>
              <td className="py-2 px-4">Edit | Delete</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">jane@example.com</td>
              <td className="py-2 px-4">Employer</td>
              <td className="py-2 px-4">Edit | Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
