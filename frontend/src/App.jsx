import { Navigate, Route, Routes } from 'react-router-dom';
import { PortalRoute, ProtectedRoute } from './components/guards/ProtectedRoute.tsx';
import LoginPage from './features/auth/LoginPage.tsx';
import About from './pages/landing/About.jsx';
import Contact from './pages/landing/Contact.jsx';
import Home from './pages/landing/Home.jsx';
import Organizations from './pages/landing/Organizations.jsx';
import Pricing from './pages/landing/Pricing';
import Professionals from './pages/landing/Professionals.jsx';
import Services from './pages/landing/Services.jsx';
import PortalEntryRedirect from './portal/PortalEntryRedirect.tsx';
import AcademyPortalLayout from './portal/layouts/AcademyPortalLayout.tsx';
import AdminPortalLayout from './portal/layouts/AdminPortalLayout.tsx';
import ClientPortalLayout from './portal/layouts/ClientPortalLayout.tsx';
import ProfessionalPortalLayout from './portal/layouts/ProfessionalPortalLayout.tsx';
import StaffPortalLayout from './portal/layouts/StaffPortalLayout.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/professionals" element={<Professionals />} />
      <Route path="/organizations" element={<Organizations />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/portal" element={<ProtectedRoute><PortalEntryRedirect /></ProtectedRoute>} />
      <Route path="/portal/admin/*" element={<PortalRoute portal="admin"><AdminPortalLayout /></PortalRoute>} />
      <Route path="/portal/staff/*" element={<PortalRoute portal="staff"><StaffPortalLayout /></PortalRoute>} />
      <Route path="/portal/professional/*" element={<PortalRoute portal="professional"><ProfessionalPortalLayout /></PortalRoute>} />
      <Route path="/portal/academy/*" element={<PortalRoute portal="academy"><AcademyPortalLayout /></PortalRoute>} />
      <Route path="/portal/client/*" element={<PortalRoute portal="client"><ClientPortalLayout /></PortalRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
