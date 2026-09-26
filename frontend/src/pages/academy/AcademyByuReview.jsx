import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyByuReview() {
  const navigate = useNavigate();

  const handleMockApproval = () => {
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
        byuReviewStatus: "APPROVED",
      }),
    );

    navigate("/academy/payment");
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
              Document review
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Your BYU-Pathway proof has been submitted and is now under
              review.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm md:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
                ?
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#003F8E]">
                Under review
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                In production, an Academy Manager would review your document
                and an email would be sent when a decision is made.
              </p>

              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
                <p className="font-semibold text-amber-900">
                  Development mode
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  For now, we can simulate manager approval.
                </p>
              </div>

              <button
                type="button"
                onClick={handleMockApproval}
                className="mt-8 w-full rounded-full bg-[#003F8E] px-8 py-3.5 font-bold text-white"
              >
                Simulate Approval
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
