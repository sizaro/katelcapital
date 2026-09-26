import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyByuVerification() {
  const navigate = useNavigate();
  const [application, setApplication] = useState(() => {
    const stored = sessionStorage.getItem("katelAcademyApplication");
    return stored ? JSON.parse(stored) : null;
  });

  const handleChoice = (isGraduate) => {
    if (!application?.email) {
      navigate("/academy/register", { replace: true });
      return;
    }

    sessionStorage.setItem(
      "katelAcademyApplication",
      JSON.stringify({
        ...application,
        byuPathwayGraduate: isGraduate,
      }),
    );

    navigate(
      isGraduate
        ? "/academy/byu-upload"
        : "/academy/payment",
    );
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
              BYU-Pathway graduate status
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Your answer determines whether you need to provide proof of
              your BYU-Pathway graduate status before continuing to payment.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
              <h2 className="text-2xl font-bold text-[#003F8E]">
                Are you a BYU-Pathway graduate?
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                BYU-Pathway graduates can submit proof of their graduate
                status for review before continuing to payment.
              </p>

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  onClick={() => handleChoice(true)}
                  className="w-full rounded-2xl border-2 border-[#003F8E] px-6 py-5 text-left font-semibold text-[#003F8E] transition hover:bg-blue-50"
                >
                  Yes, I am a BYU-Pathway graduate
                </button>

                <button
                  type="button"
                  onClick={() => handleChoice(false)}
                  className="w-full rounded-2xl border border-gray-300 px-6 py-5 text-left font-semibold text-gray-800 transition hover:border-[#003F8E] hover:bg-gray-50"
                >
                  No, I am not a BYU-Pathway graduate
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
