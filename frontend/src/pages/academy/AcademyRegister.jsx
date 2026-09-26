import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyRegister() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setError("");

    sessionStorage.setItem(
      "katelAcademyApplication",
      JSON.stringify({
        email: normalizedEmail,
        emailVerified: false,
      }),
    );

    navigate("/academy/verify-email");
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
              Start your Academy journey
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Enter your email address to begin. We&apos;ll send you a
              verification code before you continue with the Academy process.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#003F8E]">
                  Verify your email
                </h2>

                <p className="mt-2 leading-7 text-gray-600">
                  Enter the email address you want to use for your Katel Academy
                  journey. We&apos;ll send a verification code to this address.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-[#003F8E]/10"
                    placeholder="you@example.com"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#003F8E] px-8 py-3.5 font-bold text-white transition hover:opacity-90"
                >
                  Send Verification Code
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
