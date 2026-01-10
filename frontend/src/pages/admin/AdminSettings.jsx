// src/pages/admin/AdminSettings.jsx
import React from "react";

const Settings = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Settings</h1>
      <p className="text-gray-600 mb-6">
        Configure system preferences, update your profile, or adjust admin settings.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="Enter new password"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
