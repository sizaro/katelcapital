import { Navigate, Route, Routes } from "react-router-dom";
import {
  PortalRoute,
  ProtectedRoute,
} from "./components/guards/ProtectedRoute.tsx";

import About from "./pages/landing/About.jsx";
import Academy from "./pages/academy/Academy.jsx";
import AcademyRegister from "./pages/academy/AcademyRegister.jsx";
import AcademyVerifyEmail from "./pages/academy/AcademyVerifyEmail.jsx";
import AcademyByuVerification from "./pages/academy/AcademyByuVerification.jsx";
import AcademyByuUpload from "./pages/academy/AcademyByuUpload.jsx";
import AcademyByuReview from "./pages/academy/AcademyByuReview.jsx";
import AcademyPayment from "./pages/academy/AcademyPayment.jsx";
import AcademyMobileMoney from "./pages/academy/AcademyMobileMoney.jsx";
import AcademyPaymentProcessing from "./pages/academy/AcademyPaymentProcessing.jsx";
import AcademyPaymentSuccess from "./pages/academy/AcademyPaymentSuccess.jsx";
import AcademyActivate from "./pages/academy/AcademyActivate.jsx";

import Contact from "./pages/landing/Contact.jsx";
import Home from "./pages/landing/Home.jsx";
import Organizations from "./pages/landing/Organizations.jsx";
import Pricing from "./pages/landing/Pricing";
import Professionals from "./pages/landing/Professionals.jsx";
import Services from "./pages/landing/Services.jsx";

import LoginPage from "./features/auth/LoginPage.tsx";

import PortalEntryRedirect from "./portal/PortalEntryRedirect.tsx";
import AcademyPortalLayout from "./portal/layouts/AcademyPortalLayout.tsx";
import AdminPortalLayout from "./portal/layouts/AdminPortalLayout.tsx";
import ClientPortalLayout from "./portal/layouts/ClientPortalLayout.tsx";
import ProfessionalPortalLayout from "./portal/layouts/ProfessionalPortalLayout.tsx";
import StaffPortalLayout from "./portal/layouts/StaffPortalLayout.tsx";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/professionals" element={<Professionals />} />
      <Route path="/organizations" element={<Organizations />} />

      {/* ACADEMY APPLICATION */}
      <Route path="/academy" element={<Academy />} />
      <Route path="/academy/register" element={<AcademyRegister />} />
      <Route path="/academy/verify-email" element={<AcademyVerifyEmail />} />
      <Route
        path="/academy/byu-verification"
        element={<AcademyByuVerification />}
      />
      <Route path="/academy/byu-upload" element={<AcademyByuUpload />} />
      <Route path="/academy/byu-review" element={<AcademyByuReview />} />
      <Route path="/academy/payment" element={<AcademyPayment />} />
      <Route
        path="/academy/payment/mobile-money"
        element={<AcademyMobileMoney />}
      />
      <Route
        path="/academy/payment/mobile-money/processing"
        element={<AcademyPaymentProcessing />}
      />
      <Route
        path="/academy/payment/success"
        element={<AcademyPaymentSuccess />}
      />
      <Route path="/academy/activate" element={<AcademyActivate />} />

      <Route path="/services" element={<Services />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />

      {/* PORTAL ENTRY */}
      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <PortalEntryRedirect />
          </ProtectedRoute>
        }
      />

      {/* ADMIN PORTAL */}
      <Route
        path="/portal/admin/*"
        element={
          <PortalRoute portal="admin">
            <AdminPortalLayout />
          </PortalRoute>
        }
      />

      {/* STAFF PORTAL */}
      <Route
        path="/portal/staff/*"
        element={
          <PortalRoute portal="staff">
            <StaffPortalLayout />
          </PortalRoute>
        }
      />

      {/* PROFESSIONAL PORTAL */}
      <Route
        path="/portal/professional/*"
        element={
          <PortalRoute portal="professional">
            <ProfessionalPortalLayout />
          </PortalRoute>
        }
      />

      {/* ACADEMY PORTAL */}
      <Route
        path="/portal/academy/*"
        element={
          <PortalRoute portal="academy">
            <AcademyPortalLayout />
          </PortalRoute>
        }
      />

      {/* CLIENT PORTAL */}
      <Route
        path="/portal/client/*"
        element={
          <PortalRoute portal="client">
            <ClientPortalLayout />
          </PortalRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
