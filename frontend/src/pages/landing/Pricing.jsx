import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Pricing() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-[#003F8E] text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <p className="uppercase tracking-widest text-[#F7C621] font-semibold mb-4">
            Pricing
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Build Exceptional Teams Without Exceptional Hiring Costs
          </h1>

          <p className="text-xl text-gray-100 mb-4">
            Starting at $10/hour
          </p>

          <p className="max-w-3xl mx-auto text-lg text-gray-200 mb-8">
            Access skilled remote professionals without the overhead cost of
            traditional hiring.
          </p>

          <button
            onClick={() =>
              window.open(
                "https://forms.gle/o7evZJqwgeCzShYp8",
                "_blank"
              )
            }
            className="bg-[#F7C621] text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Hiring Now
          </button>
        </div>
      </section>

      {/* ================= SIMPLE PRICING ================= */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-6">
            Simple. Transparent. Built for Growth.
          </h2>

          <p className="text-gray-600 text-lg">
            No hidden fees. Just reliable talent and predictable pricing.
          </p>
        </div>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

          {/* ================= DEDICATED TALENT ================= */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#003F8E] mb-3">
                Dedicated Talent Model
              </h2>

              <p className="text-4xl font-bold text-black mb-4">
                $10/hour
                <span className="text-lg text-gray-500 font-medium">
                  {" "}per professional
                </span>
              </p>

              <p className="text-gray-600 mb-6">
                Managed directly by your organization.
              </p>

              <p className="text-gray-700 leading-7">
                Ideal for organizations that want full control of daily
                operations while accessing pre-vetted remote professionals.
              </p>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://forms.gle/o7evZJqwgeCzShYp8",
                  "_blank"
                )
              }
              className="bg-[#003F8E] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Hire Now
            </button>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#003F8E] mb-6">
                What’s in for you?
              </h3>

              <div className="space-y-6">

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Talent Access
                  </h4>
                  <p className="text-gray-600">
                    Gain access to Katel’s growing network of university
                    graduates and experienced professionals across Uganda.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Screening & Verification
                  </h4>
                  <p className="text-gray-600">
                    Every professional goes through skill assessments,
                    English screening, live interviews, and remote work
                    readiness checks.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Contractor Administration
                  </h4>
                  <p className="text-gray-600">
                    Katel manages contractor onboarding, agreements,
                    payment coordination, and workforce support.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Direct Team Management
                  </h4>
                  <p className="text-gray-600">
                    Your organization manages daily tasks, training,
                    priorities, and performance expectations.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Dedicated Client Support
                  </h4>
                  <p className="text-gray-600">
                    A Katel support specialist remains available to ensure
                    smooth communication and performance alignment.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Flexible Growth
                  </h4>
                  <p className="text-gray-600">
                    Scale from 1 professional to 50+ as your business grows.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Fast Hiring Timeline
                  </h4>
                  <p className="text-gray-600">
                    Start interviewing qualified candidates within
                    2–5 business days.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ================= MANAGED WORKFORCE ================= */}
          <div className="bg-[#003F8E] text-white rounded-2xl shadow-lg p-8">

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3">
                Managed Workforce Solutions
              </h2>

              <p className="text-4xl font-bold mb-4">
                Custom Pricing
              </p>

              <p className="text-gray-200 mb-6">
                Fully supported by Katel.
              </p>

              <p className="text-gray-100 leading-7">
                Best for organizations that want Katel to handle workforce
                management, performance tracking, and operational oversight.
              </p>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://forms.gle/o7evZJqwgeCzShYp8",
                  "_blank"
                )
              }
              className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Contact Us
            </button>

            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6">
                What’s Included
              </h3>

              <div className="space-y-6">

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Talent Pipeline
                  </h4>
                  <p className="text-gray-200">
                    Access pre-screened remote professionals across
                    customer support, operations, admin, sales, tech,
                    and more.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    End-to-End Management
                  </h4>
                  <p className="text-gray-200">
                    Katel handles daily workforce coordination,
                    quality monitoring, reporting, and team support.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Payroll & Contractor Coordination
                  </h4>
                  <p className="text-gray-200">
                    We manage payments, contractor compliance,
                    and operational support.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Performance Monitoring
                  </h4>
                  <p className="text-gray-200">
                    Regular reporting, productivity tracking,
                    and workforce optimization.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Scalable Teams
                  </h4>
                  <p className="text-gray-200">
                    Built for organizations needing 5+ professionals.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Launch Timeline
                  </h4>
                  <p className="text-gray-200">
                    Your team can be operational within 1–2 weeks.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= BIG CTA ================= */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-[#003F8E] mb-6">
            Build a Massive Team Starting at Just $10/Hour
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Cut costs. Reduce hiring stress. Access dependable remote talent.
          </p>

          <button
            onClick={() =>
              window.open(
                "https://forms.gle/o7evZJqwgeCzShYp8",
                "_blank"
              )
            }
            className="bg-[#003F8E] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Start Hiring
          </button>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 px-6 bg-[#F7F7F7]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#003F8E] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">

            {[
              {
                q: "How does Katel pricing work?",
                a: "Katel charges organizations a simple hourly rate based on the role, experience level, and engagement structure.",
              },
              {
                q: "What’s included in the $10/hour rate?",
                a: "This includes talent sourcing, screening, contractor onboarding, workforce support, and ongoing client coordination.",
              },
              {
                q: "Are there any setup fees?",
                a: "No. Katel operates with transparent pricing and no hidden onboarding costs.",
              },
              {
                q: "Are there long-term contracts?",
                a: "We offer flexible engagement options depending on your hiring needs.",
              },
              {
                q: "How fast can we start hiring?",
                a: "Most clients begin interviewing qualified candidates within 2–5 business days.",
              },
              {
                q: "Can Katel support scaling teams?",
                a: "Yes. Whether you need one professional or a larger remote team, Katel is built to scale with your organization.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-lg text-[#003F8E] mb-3">
                  {item.q}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.a}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-[#003F8E] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Team?
          </h2>

          <p className="text-gray-100 text-lg mb-10">
            Tell us what you're hiring for, and we’ll show you what’s possible.
          </p>

          <div className="max-w-2xl mx-auto text-left bg-white/10 rounded-2xl p-8 mb-10">
            <div className="space-y-4 text-lg">
              <p>✔ Access skilled remote professionals for your open roles</p>
              <p>✔ Receive clear, predictable pricing</p>
              <p>✔ Start interviewing in days, not months</p>
            </div>
          </div>

          <button
            onClick={() =>
              window.open(
                "https://forms.gle/o7evZJqwgeCzShYp8",
                "_blank"
              )
            }
            className="bg-[#F7C621] text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Book a Call
          </button>

        </div>
      </section>

      <Footer />
    </div>
  );
}