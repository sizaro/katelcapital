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
  const [accountOptions, setAccountOptions] = useState(false);
  const [authForm, setAuthForm] = useState("login");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");

  const isHeroVisible = useHeroVisible();

  const {
    loginUser,
    createUser,
    checkAuth,
    forgotPassword,
    searchJobs,
    searchWorkers,
  } = useData();

  const navigate = useNavigate();
  const accountRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleRegister = async (formData) => {
    try {
      await createUser({ ...formData, role: "worker" });
      setRegisterOpen(false);
      setLoginOpen(true);
    } catch {
      alert("Account creation failed");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const jobResults = searchJobs(search);
    const workerResults = searchWorkers(search);

    if (jobResults.length > 0) {
      navigate("/jobs", { state: { results: jobResults } });
    } else {
      navigate("/workers", { state: { results: workerResults } });
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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* BRAND */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="/images/katel_capital_logo1.png"
            alt="Katel Capital"
            className="h-20 w-auto rounded-full"
          />
          <span className="text-lg font-bold text-[#003F8E] hidden sm:block">
            Katel Capital
          </span>
        </NavLink>

        {/* MOBILE MENU BUTTON */}
        <button
          className="sm:hidden text-[#003F8E] text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* NAV LINKS */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:flex absolute sm:static top-14 left-0 w-full sm:w-auto bg-white sm:space-x-6`}
        >
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
                `block px-4 py-2 font-medium border-b-2 ${
                  isActive
                    ? "border-[#F7C621] text-[#003F8E]"
                    : "border-transparent text-gray-700 hover:border-[#F7C621]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* MOBILE BUTTONS */}
          <div className="sm:hidden flex flex-col gap-3 px-4 py-4">
            <button
              onClick={() => {
                navigate("/organizations");
                setMenuOpen(false);
              }}
              className="border border-[#003F8E] text-[#003F8E] px-4 py-2 rounded-lg"
            >
              Start Hiring
            </button>

            <button
              onClick={() => {
                navigate("/professionals");
                setMenuOpen(false);
              }}
              className="bg-[#003F8E] text-white px-4 py-2 rounded-lg"
            >
              Apply for a Job
            </button>
          </div>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-3 ml-4">
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
            Apply for a Job
          </button>
        </div>

      </div>

      {/* MODALS (unchanged) */}
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