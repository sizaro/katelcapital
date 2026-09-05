import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthProvider";
import { portalPathForRole } from "../../portal/portalAccess";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handlePortal = () => {
    if (user) {
      navigate(portalPathForRole(user.role));
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
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
                className={({ isActive }) =>
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
              aria-label="Open menu"
            >
              ☰
            </button>

          </div>

          {/* ================= DESKTOP BUTTONS ================= */}
          <div className="hidden lg:flex items-center gap-3">

            {user ? (
              <>
                <span className="text-sm font-semibold text-slate-600">
                  {user.firstName}
                </span>

                <button
                  onClick={handlePortal}
                  className="text-[#003F8E] px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Workspace
                </button>

                <button
                  onClick={() => void handleLogout()}
                  className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handlePortal}
                className="text-[#003F8E] px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Portal login
              </button>
            )}

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
              aria-label="Close menu"
            >
              ×
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

            {/* MOBILE AUTH */}
            <div className="mt-6 flex flex-col gap-3">

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handlePortal();
                }}
                className="w-full rounded-lg bg-[#003F8E] px-4 py-3 font-semibold text-white"
              >
                {user ? "Open Workspace" : "Portal login"}
              </button>

              {user && (
                <button
                  onClick={() => void handleLogout()}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700"
                >
                  Logout
                </button>
              )}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/organizations");
                }}
                className="w-full rounded-lg border border-[#003F8E] px-4 py-3 font-semibold text-[#003F8E]"
              >
                Start Hiring
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/professionals");
                }}
                className="w-full rounded-lg bg-[#003F8E] px-4 py-3 font-semibold text-white"
              >
                Find Work
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
