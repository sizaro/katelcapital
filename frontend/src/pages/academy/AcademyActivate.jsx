import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyActivate() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const stored = sessionStorage.getItem("katelAcademyApplication");

    if (!stored) {
      navigate("/academy/register", { replace: true });
      return;
    }

    const application = JSON.parse(stored);

    sessionStorage.setItem(
      "katelAcademyApplication",
      JSON.stringify({
        ...application,
        accountActivated: true,
      }),
    );

    sessionStorage.setItem("katelAcademyLearnerAuthenticated", "true");

    navigate("/portal/academy");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="bg-[#003F8E] px-6 py-16 text-white md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F7C621]">
              Katel Academy
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">
              Activate your Academy account
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Your payment is complete. Create your Academy password to
              activate your learner account.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>

                <p className="rounded-xl bg-gray-50 px-4 py-3 text-gray-700">
                  {JSON.parse(
                    sessionStorage.getItem("katelAcademyApplication") || "{}",
                  ).email || ""}
                </p>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#003F8E] focus:ring-2 focus:ring-[#003F8E]/10"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#003F8E] focus:ring-2 focus:ring-[#003F8E]/10"
                />
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#003F8E] px-8 py-3.5 font-bold text-white"
              >
                Create Academy Account
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
