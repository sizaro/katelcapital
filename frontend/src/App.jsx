import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

/* ===== PUBLIC / LANDING PAGES ===== */
import Home from "./pages/landing/Home.jsx";
import About from "./pages/landing/About.jsx";
import Professionals from "./pages/landing/Professionals.jsx";
import Organizations from "./pages/landing/Organizations.jsx";
import Services from "./pages/landing/Services.jsx";
import Pricing from "./pages/landing/Pricing";
import Contact from "./pages/landing/Contact.jsx";




function App() {
  return (
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />



      </Routes>
  );
}

export default App;
