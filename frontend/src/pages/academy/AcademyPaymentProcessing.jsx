import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyPaymentProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = sessionStorage.getItem("katelAcademyApplication");

      if (stored) {
        const application = JSON.parse(stored);

        sessionStorage.setItem(
          "katelAcademyApplication",
          JSON.stringify({
            ...application,
            paymentStatus: "CONFIRMED",
          }),
        );
      }

      navigate("/academy/payment/success", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-[#003F8E]" />

          <h1 className="mt-8 text-3xl font-bold text-[#003F8E]">
            Processing payment
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            Please wait while we process your Mobile Money payment.
          </p>

          <p className="mt-8 text-sm font-semibold text-amber-700">
            Development mode: payment is being simulated.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
