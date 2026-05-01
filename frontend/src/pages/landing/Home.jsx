// src/pages/landing/Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Home() {
  const staticBaseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5500"
      : "https://salonmanagementsystemv2-ru0i.onrender.com";

  const [popularCategories, setPopularCategories] = useState([]);

  useEffect(() => {
    const mockCategories = [
      {
        service_name: "Plumbing",
        description: "Skilled plumbers for homes and offices.",
        image_url: "/images/categories/plumbing.jpg",
      },
      {
        service_name: "Electrician",
        description: "Certified electricians for installations & repairs.",
        image_url: "/images/categories/electrician.jpg",
      },
      {
        service_name: "Carpentry",
        description: "Professional carpenters for woodwork.",
        image_url: "/images/categories/carpentry.jpg",
      },
      {
        service_name: "Cleaning",
        description: "Reliable home and office cleaning services.",
        image_url: "/images/categories/cleaning.jpg",
      },
    ];

    setPopularCategories(mockCategories);
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="relative w-full h-[80vh]" id="hero-section">
        <img
          src="/images/katel_capital_hero.jpg"
          alt="Katel Capital"
          className="w-full h-full object-cover brightness-75"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-3xl md:text-6xl font-bold mb-4">
            Find Work. Hire Talent.
          </h1>

          <p className="max-w-xl text-lg mb-6">
            Katel Capital connects skilled workers with employers across Uganda.
          </p>

          {/* Search bar (Upwork style idea) */}
          <div className="flex w-full max-w-xl bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search jobs, skills, or workers..."
              className="w-full px-4 py-3 text-black outline-none"
            />
            <button className="bg-blue-600 px-6 text-white font-semibold">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* ================= QUICK ACTIONS ================= */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6 text-center">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-2">I want to Hire</h2>
            <p className="text-gray-600 mb-4">
              Find skilled professionals quickly.
            </p>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Hire Talent
            </button>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-2">I want Work</h2>
            <p className="text-gray-600 mb-4">
              Get jobs that match your skills.
            </p>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Find Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCategories.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={`${staticBaseUrl}${cat.image_url}`}
                alt={cat.service_name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {cat.service_name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Create Profile", text: "Sign up as worker or employer." },
              { title: "Connect", text: "Post jobs or apply to jobs." },
              { title: "Work & Earn", text: "Complete jobs and get paid." },
            ].map((step, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Trusted Platform
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Verified Users",
              "Secure Payments",
              "Fair Jobs",
              "Admin Support",
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            What People Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Found workers fast and easy.",
              "Got my first job in days.",
              "Very simple and clear system.",
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl">
                <p className="italic">“{t}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Journey Today
        </h2>
        <p className="mb-6">
          Join Katel Capital and unlock opportunities.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
}