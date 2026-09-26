import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyVerifyEmail() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const application = sessionStorage.getItem("katelAcademyApplication");

    if (!application) {
      navigate("/academy/register", { replace: true });
      return;
    }

    try {
      const parsedApplication = JSON.parse(application);

      if (!parsedApplication.email) {
        navigate("/academy/register", { replace: true });
        return;
      }

      setEmail(parsedApplication.email);
    } catch {
      sessionStorage.removeItem("katelAcademyApplication");
      navigate("/academy/register", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (code.trim() !== "123456") {
      setError("The verification code is incorrect. Please try again.");
      return;
    }

    const application = sessionStorage.getItem("katelAcademyApplication");

    if (!application) {
      navigate("/academy/register", { replace: true });
      return;
    }

    try {
      const parsedApplication = JSON.parse(application);

      sessionStorage.setItem(
        "katelAcademyApplication",
        JSON.stringify({
          ...parsedApplication,
          emailVerified: true,
        }),
      );

      navigate("/academy/byu-verification");
    } catch {
      sessionStorage.removeItem("katelAcademyApplication");
      navigate("/academy/register", { replace: true });
    }
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
              Verify your email
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Enter the verification code we sent to your email address to
              continue.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
                  ✉
                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#003F8E]">
                  Check your email
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  We sent a verification code to:
                </p>

                <p className="mt-2 font-semibold text-gray-900">{email}</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="verificationCode"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Verification code
                  </label>

                  <input
                    id="verificationCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.35em] outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-[#003F8E]/10"
                    placeholder="000000"
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
                  Verify Email
                </button>
              </form>

              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-900">
                  Development mode
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Real email delivery will be connected later. For now, use this
                  development verification code:
                </p>

                <p className="mt-3 text-center text-2xl font-bold tracking-[0.25em] text-amber-900">
                  123456
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
