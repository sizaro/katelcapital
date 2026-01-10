// src/components/common/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
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
  const [accountOptions, setAccountOptions] = useState(false);
  const [authForm, setAuthForm] = useState("login");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const { loginUser, createUser, checkAuth, forgotPassword } = useData();
  const navigate = useNavigate();
  const accountRef = useRef(null);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGIN ================= */
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setLoginError(null);

    try {
      const res = await loginUser({ email, password });
      await checkAuth();
      setLoginOpen(false);

      if (res.role === "admin") navigate("/admin");
      else if (res.role === "employer") navigate("/employer");
      else if (res.role === "worker") navigate("/worker");
      else navigate("/");
    } catch (err) {
      setLoginError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async (formData) => {
    try {
      // default role for MVP
      await createUser({ ...formData, role: "worker" });
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
      setToast({ message: "", type: "success" });
      setAuthForm("login");
      setLoginOpen(false);
    }, 5000);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* BRAND */}
        <NavLink to="/" className="text-xl md:text-2xl font-bold text-blue-700">
          Katel Capital Ltd
        </NavLink>

        {/* MOBILE MENU */}
        <button
          className="sm:hidden text-blue-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV LINKS */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:flex absolute sm:static top-14 left-0 w-full sm:w-auto bg-white sm:space-x-6`}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/jobs", label: "Jobs" },
            { to: "/workers", label: "Workers" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 font-medium border-b-2 transition ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-700 hover:border-blue-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* ACCOUNT */}
          <div className="relative px-4" ref={accountRef}>
            <button
              onClick={() => setAccountOptions(!accountOptions)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Account
            </button>

            {accountOptions && (
              <div className="absolute right-0 w-40 bg-white shadow rounded">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setRegisterOpen(true)}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)}>
        {authForm === "login" ? (
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={loginError}
            onForgotPassword={() => setAuthForm("forgot")}
          />
        ) : (
          <ForgotPasswordForm
            onSubmit={handleForgotPasswordSubmit}
            onCancel={() => setAuthForm("login")}
            loading={loading}
          />
        )}
      </Modal>

      {/* REGISTER MODAL */}
      <Modal isOpen={registerOpen} onClose={() => setRegisterOpen(false)}>
        <UserForm role="worker" onSubmit={handleRegister} />
      </Modal>

      {toast.message && (
        <ToastModal
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: toast.type })}
        />
      )}
    </nav>
  );
}
