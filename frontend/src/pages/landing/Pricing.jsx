import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Pricing() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-[#003F8E] text-white py-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Transparent Workforce Solutions
        </h1>

        <p className="max-w-3xl mx-auto text-gray-100 text-lg">
          Katel Capital offers flexible pricing designed to support organizations
          at different stages of growth.
        </p>
      </section>

      {/* ================= INTRO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-700">
          Our goal is to create a sustainable model that benefits both
          organizations and professionals.
        </p>
      </section>

      {/* ================= STARTER PLAN ================= */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-[#003F8E] mb-4">
            Starter Plan
          </h2>

          <p className="text-gray-600 mb-4">
            Best for small organizations testing new roles.
          </p>

          <h3 className="font-semibold mb-2">Includes</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Talent sourcing</li>
            <li>Candidate screening</li>
            <li>Interview coordination</li>
            <li>Onboarding support</li>
          </ul>
        </div>
      </section>

      {/* ================= GROWTH PLAN ================= */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-[#F7F7F7] border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#003F8E] mb-4">
            Growth Plan
          </h2>

          <p className="text-gray-600 mb-4">
            Designed for organizations building expanding teams.
          </p>

          <h3 className="font-semibold mb-2">Includes</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Talent sourcing</li>
            <li>Candidate screening</li>
            <li>Interview management</li>
            <li>HR coordination</li>
            <li>Ongoing support</li>
          </ul>
        </div>
      </section>

      {/* ================= ENTERPRISE ================= */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-[#003F8E] mb-4">
            Enterprise Workforce Solutions
          </h2>

          <p className="text-gray-600 mb-4">
            Custom workforce solutions for larger organizations with ongoing
            staffing needs.
          </p>

          <h3 className="font-semibold mb-2">Includes</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Dedicated recruitment support</li>
            <li>Workforce strategy</li>
            <li>HR management</li>
            <li>Scalable hiring solutions</li>
          </ul>

          <p className="mt-4 text-gray-600 font-medium">
            Contact us to discuss enterprise solutions.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#003F8E] text-white py-16 text-center px-6 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Let’s Build Your Workforce
        </h2>

        <p className="mb-6 text-gray-100">
          Choose a plan that fits your organization’s needs.
        </p>

        <button
          onClick={() =>
            window.open("https://forms.gle/YOUR_GOOGLE_FORM_LINK", "_blank")
          }
          className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
}