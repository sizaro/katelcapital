import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function WhyKatel() {
  const benefits = [
    {
      title: "Trusted Workers",
      text: "Every worker is verified to reduce risk and increase trust.",
    },
    {
      title: "Fast Hiring",
      text: "Find skilled people in minutes, not weeks.",
    },
    {
      title: "Secure Communication",
      text: "Chat and agree on work safely inside the platform.",
    },
    {
      title: "Fair Pricing",
      text: "No hidden fees or exploitation. Transparent rates only.",
    },
    {
      title: "Local Focus",
      text: "Built for Uganda and East Africa job markets.",
    },
    {
      title: "Opportunity for Everyone",
      text: "Both skilled and unskilled workers can find work.",
    },
  ];

  const stats = [
    { label: "Workers Registered", value: "10,000+" },
    { label: "Jobs Posted", value: "5,000+" },
    { label: "Employers", value: "2,000+" },
    { label: "Success Rate", value: "92%" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-blue-600 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Why Katel Capital?
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          We are building the simplest way to connect workers and employers in Uganda.
        </p>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-blue-700">{s.value}</h2>
              <p className="text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Makes Us Different
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-600">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

          <p className="text-gray-700 leading-relaxed">
            Katel Capital was built to solve a simple problem:
            many skilled workers struggle to find jobs, while employers struggle
            to find trusted workers. We bridge that gap using technology.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Our goal is to build the most trusted work marketplace in East Africa,
            where opportunity is open to everyone.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Join the Future of Work
        </h2>
        <p className="mb-6">
          Start hiring or working in minutes.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
}