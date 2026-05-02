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
      </section>

      {/* ================= MISSION ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-4">
          Our Mission
        </h2>

        <p className="text-gray-700 leading-relaxed">
          To connect organizations with reliable talent while creating meaningful
          career opportunities for skilled professionals.
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
          A future where talent can thrive regardless of geography, and organizations
          can access the skills they need to grow.
        </p>
      </section>

      {/* DIVIDER */}
      <div className="border-t max-w-5xl mx-auto" />

      {/* ================= STORY ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-4">
          Our Story
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Katel Capital was founded on the belief that talented professionals exist
          everywhere, but opportunities are not always accessible.
        </p>

        <p className="text-gray-700 leading-relaxed">
          By connecting organizations with capable professionals, Katel helps
          businesses grow while supporting career development and economic opportunity.
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