// src/pages/admin/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">
        Welcome, Admin! Here you can see a quick overview of the system, recent activity, and key metrics.
      </p>
      {/* You can add cards, charts, or widgets here */}
    </div>
  );
};

export default AdminDashboard;
