import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

/* ===== PUBLIC / LANDING PAGES ===== */
import Home from "./pages/landing/Home.jsx";
import About from "./pages/landing/About.jsx";
import Jobs from "./pages/landing/Jobs.jsx";
import Workers from "./pages/landing/Workers.jsx";
import Contact from "./pages/landing/Contact.jsx";
import ResetPassword from "./pages/landing/ResetPassword.jsx";

/* ===== DASHBOARD LAYOUTS ===== */
import AdminLayout from "./components/layout/AdminLayout.jsx";
import EmployerLayout from "./components/layout/EmployerLayout.jsx";
import WorkerLayout from "./components/layout/WorkerLayout.jsx";

function App() {
  return (
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* ================= EMPLOYER ROUTES ================= */}
        <Route
          path="/employer/*"
          element={
            <ProtectedRoute role="employer">
              <EmployerLayout />
            </ProtectedRoute>
          }
        />

        {/* ================= WORKER ROUTES ================= */}
        <Route
          path="/worker/*"
          element={
            <ProtectedRoute role="worker">
              <WorkerLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;
