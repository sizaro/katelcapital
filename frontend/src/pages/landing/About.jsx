import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function About() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen flex flex-col">

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-[#003F8E] text-white py-20 px-6 text-center">

        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About Katel Capital
        </h1>

        <p className="max-w-3xl mx-auto text-gray-100 text-lg">
          Building bridges between talent and opportunity.
        </p>

        {/* ADDED HERO SUBTITLE */}
        <p className="max-w-3xl mx-auto text-gray-200 mt-4 leading-relaxed">
          Transforming Talent. Strengthening Organizations. Building Uganda’s Future.
        </p>

      </section>

      {/* ================= INTRO STORY (ADDED FULL CONTEXT) ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <p className="text-gray-700 leading-relaxed mb-6">
          At Katel Capital, we believe talent exists everywhere, but opportunity does not always reach everyone.
          Our mission is to bridge that gap by connecting skilled professionals with organizations that need reliable talent.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Every connection we create has the potential to change lives, strengthen businesses,
          and contribute to a more productive workforce in Uganda.
        </p>

      </section>

      {/* ================= MISSION ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-4">
          Our Mission
        </h2>

        <p className="text-gray-700 leading-relaxed">
          To help organizations access dependable, high-quality talent while creating meaningful
          remote career opportunities for skilled professionals across Uganda.
        </p>

      </section>

      {/* DIVIDER */}
      <div className="border-t max-w-5xl mx-auto" />

      {/* ================= VISION ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-4">
          Our Vision
        </h2>

        <p className="text-gray-700 leading-relaxed">
          To build a future where talented professionals can thrive regardless of location,
          and organizations can grow with access to trusted, flexible workforce solutions.
        </p>

      </section>

      {/* DIVIDER */}
      <div className="border-t max-w-5xl mx-auto" />

      {/* ================= IMPACT ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
          The Impact We Aim to Create
        </h2>

        <div className="space-y-6">

          <div>
            <h3 className="font-bold text-[#003F8E]">Empowering Professionals</h3>
            <p className="text-gray-700">
              Creating access to better-paying opportunities, flexible work, and long-term career growth.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#003F8E]">Supporting Organizations</h3>
            <p className="text-gray-700">
              Helping businesses, universities, NGOs, and institutions hire faster, reduce costs, and build stronger teams.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#003F8E]">Strengthening Communities</h3>
            <p className="text-gray-700">
              When professionals earn better and work flexibly, families become stronger, communities grow, and local economies benefit.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#003F8E]">Advancing Uganda’s Workforce</h3>
            <p className="text-gray-700">
              Helping Uganda embrace remote work, digital employment, and a more globally competitive workforce.
            </p>
          </div>

        </div>

      </section>

      {/* DIVIDER */}
      <div className="border-t max-w-5xl mx-auto" />

      {/* ================= WHY KATEL EXISTS ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-4">
          Why Katel Exists
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Katel was founded on a simple belief:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Skilled people should not be limited by geography.</li>
          <li>Organizations should not struggle to find dependable talent.</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mt-4">
          By bridging these two realities, Katel is building more than careers and teams —
          we are building opportunity.
        </p>

      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#003F8E] text-white py-16 text-center px-6">

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join the Movement
        </h2>

        <p className="mb-6 text-gray-100">
          Whether you are an organization or a professional, Katel is here to connect you.
        </p>

        <button
          onClick={() => window.location.href = "/professionals"}
          className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </button>

      </section>

      <Footer />
    </div>
  );
}