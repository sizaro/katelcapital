// src/pages/worker/WorkerProfile.jsx
import React from "react";

const Profile = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">My Profile</h1>
      <p className="text-gray-600 mb-6">Review and update your personal information and settings.</p>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="New password"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
