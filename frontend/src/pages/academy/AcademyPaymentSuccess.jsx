import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyPaymentSuccess() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/academy/activate");
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
              Payment confirmed
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Your Academy payment has been confirmed and your Academy access
              is ready.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl text-green-700">
              ?
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#003F8E]">
              Welcome to Katel Academy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              In production, a confirmation email containing a secure
              continuation link would now be sent to your verified email.
            </p>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-8 w-full rounded-full bg-[#003F8E] px-8 py-3.5 font-bold text-white"
            >
              Continue to Katel Academy
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
