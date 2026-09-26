import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyPayment() {
  const navigate = useNavigate();

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
              Academy payment
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Choose how you would like to pay for your Katel Academy
              enrollment.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
              <h2 className="text-2xl font-bold text-[#003F8E]">
                Choose payment method
              </h2>

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/academy/payment/mobile-money")
                  }
                  className="w-full rounded-2xl border-2 border-[#003F8E] p-6 text-left transition hover:bg-blue-50"
                >
                  <p className="text-lg font-bold text-[#003F8E]">
                    Mobile Money
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Pay using MTN or Airtel Mobile Money.
                  </p>
                </button>

                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl border border-gray-200 p-6 text-left opacity-60"
                >
                  <p className="text-lg font-bold text-gray-800">
                    Bank
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Bank payment will be available later.
                  </p>
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
