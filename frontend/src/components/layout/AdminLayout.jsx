// src/components/layout/AdminLayout.jsx
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../sidebars/AdminSidebar.jsx";

// Pages
import AdminDashboard from "../../pages/admin/AdminDashboard.jsx";
import ManageUsers from "../../pages/admin/AdminManageUsers.jsx";
import Reports from "../../pages/admin/AdminReports.jsx";
import Settings from "../../pages/admin/AdminSettings.jsx";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto w-full mt-18 ml-[-10px] md:ml-64 md:mt-6">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
