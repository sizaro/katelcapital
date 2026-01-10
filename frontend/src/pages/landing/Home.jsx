// src/pages/landing/Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Home() {
  const staticBaseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5500"
      : "https://salonmanagementsystemv2-ru0i.onrender.com";

  // ================= MOCKED DATA =================
  const [popularCategories, setPopularCategories] = useState([]);

  useEffect(() => {
    // Simulate fetching from DB
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
        description: "Professional carpenters for all woodwork needs.",
        image_url: "/images/categories/carpentry.jpg",
      },
      {
        service_name: "Cleaning",
        description: "Reliable cleaning services for homes & offices.",
        image_url: "/images/categories/cleaning.jpg",
      },
      {
        service_name: "Tutoring",
        description: "Private tutors for academic excellence.",
        image_url: "/images/categories/tutoring.jpg",
      },
      {
        service_name: "Delivery",
        description: "Fast and secure delivery services across the city.",
        image_url: "/images/categories/delivery.jpg",
      },
      {
        service_name: "Gardening",
        description: "Professional gardeners to maintain your landscape.",
        image_url: "/images/categories/gardening.jpg",
      },
      {
        service_name: "Painting",
        description: "Experienced painters for homes and offices.",
        image_url: "/images/categories/painting.jpg",
      },
    ];

    setPopularCategories(mockCategories);
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="relative w-full h-[80vh] overflow-hidden">
        <img
          src="/images/katel_capital_hero.jpg"
          alt="Katel Capital"
          className="w-full h-full object-cover brightness-75"
        />

        <div
          className="absolute inset-0 hidden md:flex flex-col justify-center items-center text-center text-white px-4"
          style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
        >
          <h1 className="text-2xl md:text-6xl font-bold mb-4">Katel Capital Ltd</h1>
          <h3 className="md:text-3xl font-semibold mb-4">
            Connecting Talent with Opportunity
          </h3>
          <p className="max-w-md mb-6">
            Hire skilled professionals or find trusted work opportunities across Uganda.
          </p>
          <button className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* Mobile Hero */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center md:hidden">
        <h1 className="text-3xl font-bold mb-3 text-blue-700">Katel Capital Ltd</h1>
        <p className="mb-4">A trusted platform for employers and workers.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Get Started</button>
      </section>

      {/* ================= OPPORTUNITY CATEGORIES ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Popular Job Categories</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCategories.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={`${staticBaseUrl}${cat.image_url}`}
                alt={cat.service_name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{cat.service_name}</h3>
                <p className="text-gray-600 text-sm">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Browse All Jobs
          </button>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">How Katel Capital Works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Create an Account",
                text: "Register as an employer or worker in minutes.",
              },
              {
                title: "Post or Apply",
                text: "Employers post jobs. Workers apply based on skills.",
              },
              {
                title: "Hire & Work",
                text: "Connect, contract, and get the job done.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST & QUALITY ================= */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Trusted & Secure Platform</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-10">
            We verify users, support contracts, and promote fair work for all.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {["Verified Users", "Clear Contracts", "Secure Messaging", "Admin Oversight"].map(
              (item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-semibold">{item}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">What Users Say</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Employer – Kampala", text: "Found reliable workers quickly." },
              { name: "Worker – Mukono", text: "Got jobs without middlemen." },
              { name: "SME Owner", text: "Simple, transparent hiring." },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-md">
                <p className="italic mb-3">“{t.text}”</p>
                <h4 className="font-semibold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Hire or Get Hired?</h2>
        <p className="mb-6">Join Katel Capital today and unlock opportunities.</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
          Create Account
        </button>
      </section>

      <Footer />
    </div>
  );
}
