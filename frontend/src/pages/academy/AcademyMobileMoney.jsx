import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyMobileMoney() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!provider) {
      setError("Please select MTN or Airtel.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your Mobile Money phone number.");
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
        paymentMethod: "MOBILE_MONEY",
        mobileMoneyProvider: provider,
        mobileMoneyPhone: phone.trim(),
      }),
    );

    navigate("/academy/payment/mobile-money/processing");
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
              Mobile Money
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Select your Mobile Money provider and enter the phone number
              that should receive the payment request.
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
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Mobile Money provider
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setProvider("MTN");
                      setError("");
                    }}
                    className={`rounded-2xl border-2 p-5 font-bold ${
                      provider === "MTN"
                        ? "border-[#003F8E] bg-blue-50 text-[#003F8E]"
                        : "border-gray-200 text-gray-800"
                    }`}
                  >
                    MTN
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProvider("AIRTEL");
                      setError("");
                    }}
                    className={`rounded-2xl border-2 p-5 font-bold ${
                      provider === "AIRTEL"
                        ? "border-[#003F8E] bg-blue-50 text-[#003F8E]"
                        : "border-gray-200 text-gray-800"
                    }`}
                  >
                    Airtel
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Mobile Money phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  placeholder="+256..."
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
                Request Payment
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
