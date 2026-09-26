import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const pathwaySteps = [
  {
    number: "01",
    title: "Register",
    description:
      "Create your Katel Academy account and provide the information needed to begin your Academy journey.",
  },
  {
    number: "02",
    title: "Verification",
    description:
      "If you are a BYU-Pathway graduate, submit the required proof so your graduate status can be reviewed before the discounted Academy fee is applied.",
  },
  {
    number: "03",
    title: "Payment",
    description:
      "Complete the Academy payment process. Approved BYU-Pathway graduates receive the applicable lower Academy fee.",
  },
  {
    number: "04",
    title: "Learn",
    description:
      "After enrollment, access your protected Academy learning area and work through the available course modules and lessons at your own pace.",
  },
  {
    number: "05",
    title: "Assessment",
    description:
      "Complete the required assessments and demonstrate your understanding of the Academy material.",
  },
  {
    number: "06",
    title: "Katel Ready",
    description:
      "After completing the Academy requirements, you can proceed to the Katel-ready review and verification stage.",
  },
  {
    number: "07",
    title: "Talent Pool",
    description:
      "After becoming Katel-ready, you can choose whether you want to continue into the Katel Talent Pool and pursue professional opportunities.",
  },
];

function PathwayStep({ step, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-gray-50 md:px-7"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#003F8E] text-sm font-bold text-white">
          {step.number}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#003F8E]">{step.title}</h3>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#003F8E] text-xl font-medium text-[#003F8E]">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 px-5 pb-6 pt-5 md:px-7">
          <p className="max-w-4xl leading-7 text-gray-600">
            {step.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Academy() {
  const navigate = useNavigate();
  const [openStep, setOpenStep] = useState(0);

  const handleStartAcademy = () => {
    navigate("/academy/register");
  };

  const handleToggleStep = (index) => {
    setOpenStep((current) => (current === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003F8E] px-6 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003F8E] via-[#004B9F] to-[#002B63]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#F7C621]">
              Katel Academy
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Learn. Develop.
              <br />
              Become Katel-ready.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100 md:text-xl">
              Katel Academy provides a structured path for people who want to
              develop their professional skills, complete the Academy journey,
              and prepare for opportunities within the Katel ecosystem.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleStartAcademy}
                className="rounded-full bg-[#F7C621] px-8 py-3 font-bold text-black transition hover:opacity-90"
              >
                Start Academy
              </button>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("academy-pathway")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full border border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-[#003F8E]"
              >
                View the Pathway
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#003F8E]">
                Your Academy Journey
              </p>

              <h2 className="text-3xl font-bold leading-tight text-[#003F8E] md:text-4xl">
                A clear path from registration to professional readiness.
              </h2>
            </div>

            <div>
              <p className="leading-8 text-gray-600">
                The Academy journey is designed to take you through
                registration, verification where applicable, payment, learning,
                assessment, and completion. Completing the Academy does not
                automatically place you in the Talent Pool. Instead, you can
                proceed through the Katel-ready review process and then choose
                whether you want to enter the Talent Pool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PATHWAY */}
      <section
        id="academy-pathway"
        className="bg-[#F7F7F7] px-6 py-20 md:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#003F8E]">
              How It Works
            </p>

            <h2 className="text-3xl font-bold text-[#003F8E] md:text-4xl">
              Your Academy Pathway
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Click each step to learn what happens at that stage of the Academy
              journey.
            </p>
          </div>

          <div className="space-y-4">
            {pathwaySteps.map((step, index) => (
              <PathwayStep
                key={step.number}
                step={step}
                isOpen={openStep === index}
                onToggle={() => handleToggleStep(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#003F8E] md:text-4xl">
            Ready to begin your Academy journey?
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Start your registration and follow the guided process toward
            becoming Katel-ready.
          </p>

          <button
            type="button"
            onClick={handleStartAcademy}
            className="mt-8 rounded-full bg-[#003F8E] px-10 py-3 font-bold text-white transition hover:opacity-90"
          >
            Start Academy
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
