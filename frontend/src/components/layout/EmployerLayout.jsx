// src/components/layout/EmployerLayout.jsx
import { Routes, Route } from "react-router-dom";
import EmployerSidebar from "../sidebars/EmployerSidebar.jsx";

// Pages
import EmployerDashboard from "../../pages/employer/EmployerDashboard.jsx";
import JobPostings from "../../pages/employer/EmployerJobPostings.jsx";
import Applications from "../../pages/employer/EmployerApplications.jsx";
import Reports from "../../pages/employer/EmployerReports.jsx";

const EmployerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <EmployerSidebar />
      <main className="flex-1 p-6 overflow-y-auto w-full mt-18 ml-[-10px] md:ml-64 md:mt-6">
        <Routes>
          <Route index element={<EmployerDashboard />} />
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="job-postings" element={<JobPostings />} />
          <Route path="applications" element={<Applications />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
};

export default EmployerLayout;
