import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import LoginForm from "../auth/login.jsx";
import UserForm from "../UserForm.jsx";
import ForgotPasswordForm from "../auth/ForgotPasswordForm.jsx";
import ToastModal from "../ToastModal.jsx";
import { useData } from "../../context/DataContext.jsx";
import useHeroVisible from "./useHeroVisible.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [authForm, setAuthForm] = useState("login");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const navigate = useNavigate();

  const {
    loginUser,
    createUser,
    checkAuth,
    forgotPassword,
    searchJobs,
    searchWorkers,
  } = useData();

  const handleRegister = async (formData) => {
    try {
      await createUser({ ...formData, role: "worker" });
      setRegisterOpen(false);
      setLoginOpen(true);
    } catch {
      alert("Account creation failed");
    }
  };

  const handleForgotPasswordSubmit = async (email) => {
    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);

    setToast({
      message: res.success
        ? `Reset link sent to ${email}`
        : res.message || "Something went wrong",
      type: res.success ? "success" : "error",
    });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
      setAuthForm("login");
      setLoginOpen(false);
    }, 4000);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* BRAND */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/images/katel_capital_logo1.png"
              alt="Katel Capital"
              className="md:h-20 w-auto rounded-full h-12"
            />
            <span className="text-sm md:text-lg font-bold text-[#003F8E]">
              Katel Capital
            </span>
          </NavLink>
          <div className="flex flex-row px-6 gap-4 hidden lg:flex">

          {[
            { to: "/", label: "Home" },
            { to: "/professionals", label: "Professionals" },
            { to: "/organizations", label: "Organizations" },
            { to: "/services", label: "Services" },
            { to: "/pricing", label: "Pricing" },
            { to: "/contact", label: "Contact" },
            { to: "/about", label: "About Katel" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 border-b ${
                  isActive
                    ? "text-[#003F8E] border-[#F7C621]"
                    : "text-gray-700 border-transparent"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

          {/* MOBILE RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 lg:hidden">

            <button
              onClick={() => navigate("/organizations")}
              className="border border-[#003F8E] text-[#003F8E] px-3 py-1 rounded-lg text-sm md:text-md"
            >
              Start Hiring
            </button>

            <button
              onClick={() => navigate("/professionals")}
              className="bg-[#003F8E] text-white px-3 py-1 rounded-lg text-sm md:text-md"
            >
              Find Work
            </button>

            <button
              className="text-[#003F8E] text-3xl"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            <button
              onClick={() => navigate("/organizations")}
              className="border border-[#003F8E] text-[#003F8E] px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Start Hiring
            </button>

            <button
              onClick={() => navigate("/professionals")}
              className="bg-[#003F8E] text-white px-4 py-2 rounded-lg hover:opacity-90"
            >
              Find Work
            </button>
          </div>
        </div>
      </nav>

      {/* ================= SLIDE OVER MENU ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* CLOSE BUTTON */}
        <div className="flex justify-end p-4">
          <button
            className="text-3xl text-[#003F8E]"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* MENU LINKS */}
        <div className="flex flex-col px-6 gap-4">

          {[
            { to: "/", label: "Home" },
            { to: "/professionals", label: "Professionals" },
            { to: "/organizations", label: "Organizations" },
            { to: "/services", label: "Services" },
            { to: "/pricing", label: "Pricing" },
            { to: "/contact", label: "Contact" },
            { to: "/about", label: "About Katel" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 border-b ${
                  isActive
                    ? "text-[#003F8E] border-[#F7C621]"
                    : "text-gray-700 border-transparent"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* MODALS (UNCHANGED) */}
      <Modal isOpen={false}>
        <div />
      </Modal>
    </>
  );
}