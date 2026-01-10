// src/components/layout/WorkerLayout.jsx
import { Routes, Route } from "react-router-dom";
import WorkerSidebar from "../sidebars/WorkerSidebar.jsx";

// Pages
import WorkerDashboard from "../../pages/worker/WorkerDashboard.jsx";
import MyJobs from "../../pages/worker/WorkerMyJobs.jsx";
import Profile from "../../pages/worker/WorkerProfile.jsx";
import Reports from "../../pages/worker/WorkerReports.jsx";

const WorkerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <WorkerSidebar />
      <main className="flex-1 p-6 overflow-y-auto w-full mt-18 ml-[-10px] md:ml-64 md:mt-6">
        <Routes>
          <Route index element={<WorkerDashboard />} />
          <Route path="dashboard" element={<WorkerDashboard />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
};

export default WorkerLayout;
