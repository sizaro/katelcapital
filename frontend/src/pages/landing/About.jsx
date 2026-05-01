import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function About() {
  const features = [
    {
      title: "Trusted Platform",
      text: "We connect verified workers with real employers to ensure safe and reliable hiring.",
    },
    {
      title: "Fast Hiring",
      text: "Employers can find and hire skilled workers quickly without long processes.",
    },
    {
      title: "Skill-Based Matching",
      text: "Workers are matched based on skills, experience, and availability.",
    },
    {
      title: "Secure Communication",
      text: "All communication between users is protected and organized inside the platform.",
    },
  ];

  const steps = [
    {
      title: "1. Create an Account",
      text: "Sign up as an employer or worker in a few seconds.",
    },
    {
      title: "2. Build Your Profile",
      text: "Show your skills, experience, or job needs.",
    },
    {
      title: "3. Connect & Work",
      text: "Find jobs or hire workers and start working immediately.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Katel Capital
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          A modern platform that connects skilled workers with employers in a fast, simple, and trusted way.
        </p>
      </section>

      {/* WHO WE ARE */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Katel Capital is a digital marketplace designed to help people find work and hire talent easily.
          We remove middlemen and make hiring direct, safe, and efficient.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">What We Offer</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          To create equal access to job opportunities and make hiring simple for everyone,
          regardless of location or background.
        </p>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Katel Capital Today</h2>
        <p className="mb-6">
          Start hiring or find your next job in minutes.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
}