import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import LoginForm from "../auth/login.jsx";
import UserForm from "../UserForm.jsx";
import ForgotPasswordForm from "../auth/ForgotPasswordForm.jsx";
import ToastModal from "../ToastModal.jsx";
import { useData } from "../../context/DataContext.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [authForm, setAuthForm] = useState("login");
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  const {
    loginUser,
    createUser,
    checkAuth,
    forgotPassword,
  } = useData();

  /* ================= REGISTER ================= */
  const handleRegister = async (formData) => {
    try {
      await createUser({
        ...formData,
        role: "worker",
      });

      setRegisterOpen(false);
      setLoginOpen(true);
    } catch {
      alert("Account creation failed");
    }
  };

  /* ================= FORGOT PASSWORD ================= */
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
      setToast({
        message: "",
        type: "success",
      });

      setAuthForm("login");
      setLoginOpen(false);
    }, 4000);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-white/10 shadow-md">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* ================= LOGO ================= */}
          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src="/images/katel_capital_logo1.png"
              alt="Katel Capital"
              className="h-12 md:h-15 w-auto rounded-full"
            />

            <span className="text-sm md:text-lg font-bold text-[#003F8E]">
              Katel Capital
            </span>
          </NavLink>

          {/* ================= DESKTOP NAV LINKS ================= */}
          <div className="hidden lg:flex items-center gap-8">

            {[
              {
                to: "/professionals",
                label: "Professionals",
              },
              {
                to: "/organizations",
                label: "Organizations",
              },
              {
                to: "/pricing",
                label: "Pricing",
              },
              {
                to: "/about",
                label: "About Katel",
              },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className=  {({ isActive }) =>
                  `font-medium border-b-2 py-2 transition ${
                    isActive
                      ? "border-[#F7C621] text-[#003F8E]"
                      : "border-transparent hover:border-[#F7C621] text-[#003F8E]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

          </div>

          {/* ================= MOBILE RIGHT SECTION ================= */}
          <div className="flex items-center gap-2 lg:hidden">

            {/* HIRE BUTTON */}
            <button
              onClick={() => navigate("/organizations")}
              className="border border-[#003F8E] text-[#003F8E] px-3 py-1 rounded-lg text-sm"
            >
              Hire
            </button>

            {/* FIND WORK BUTTON */}
            <button
              onClick={() => navigate("/professionals")}
              className="bg-[#003F8E] text-white px-3 py-1 rounded-lg text-sm"
            >
              Work
            </button>

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-3xl text-[#003F8E]"
            >
              ☰
            </button>

          </div>

          {/* ================= DESKTOP BUTTONS ================= */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="text-[#003F8E] px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">Portal login</button>

            <button
              onClick={() => navigate("/organizations")}
              className="border border-[#003F8E] text-[#003F8E] px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Start Hiring
            </button>

            <button
              onClick={() => navigate("/professionals")}
              className="bg-[#003F8E] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Find Work
            </button>

          </div>

        </div>
      </nav>

      {/* ================= MOBILE SLIDE MENU ================= */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          menuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >

        {/* BACKDROP */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* CLOSE */}
          <div className="flex justify-between items-center p-5 border-b">

            <span className="font-bold text-[#003F8E] text-lg">
              Menu
            </span>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl text-[#003F8E]"
            >
              ✕
            </button>

          </div>

          {/* LINKS */}
          <div className="flex flex-col p-6">

            {[
              {
                to: "/professionals",
                label: "Professionals",
              },
              {
                to: "/organizations",
                label: "Organizations",
              },
              {
                to: "/pricing",
                label: "Pricing",
              },
              {
                to: "/about",
                label: "About Katel",
              },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-4 border-b text-lg transition ${
                    isActive
                      ? "text-[#003F8E] border-[#F7C621]"
                      : "text-gray-700 border-gray-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

          </div>

        </div>
      </div>

      {/* ================= MODALS ================= */}

      <Modal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      >
        {authForm === "login" ? (
          <LoginForm
            onSubmit={loginUser}
            loading={loading}
            error={loginError}
            onForgotPassword={() =>
              setAuthForm("forgot")
            }
          />
        ) : (
          <ForgotPasswordForm
            onSubmit={handleForgotPasswordSubmit}
            onCancel={() =>
              setAuthForm("login")
            }
            loading={loading}
          />
        )}
      </Modal>

      <Modal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      >
        <UserForm
          role="worker"
          onSubmit={handleRegister}
        />
      </Modal>

      {toast.message && (
        <ToastModal
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              message: "",
              type: toast.type,
            })
          }
        />
      )}
    </>
  );
}
