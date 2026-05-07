import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Organizations() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
        <Navbar/>
      {/* ================= HERO ================= */}
      <section className="bg-[#003F8E] text-white py-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Reliable Talent. Simplified Hiring.
        </h1>

        <p className="max-w-3xl mx-auto text-gray-100 text-lg">
          Katel Capital connects organizations with skilled professionals who
          are ready to work and contribute from day one.
        </p>
      </section>

      {/* ================= CHALLENGES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
          Hiring Challenges Organizations Face
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <ul className="space-y-2 list-disc pl-5">
            <li>Rising labor costs</li>
            <li>Limited access to qualified candidates</li>
            <li>High employee turnover</li>
          </ul>

          <ul className="space-y-2 list-disc pl-5">
            <li>Time-consuming recruitment processes</li>
            <li>Administrative staffing burdens</li>
          </ul>
        </div>

        <p className="mt-6 text-gray-600">
          Katel provides a practical solution by simplifying how organizations
          find and manage talent.
        </p>
      </section>

      {/* ================= TALENT SOLUTIONS ================= */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
            Our Talent Solutions
          </h2>

          <p className="text-gray-600 mb-8">
            We provide professionals in the following areas:
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Customer Support",
              "Administrative Support",
              "Virtual Assistance",
              "Data Management",
              "Research Assistance",
              "Technical Support",
              "Sales and Customer Engagement",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#F7F7F7] p-4 rounded-lg shadow-sm border"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-6 text-gray-600">
            All professionals are screened for communication, skill, and
            professionalism.
          </p>
        </div>
      </section>

      {/* ================= WHY PARTNER ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-8">
          Why Partner With Katel
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Carefully Selected Talent</h3>
            <p className="text-gray-600">
              Every professional is screened before joining the network.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Faster Hiring</h3>
            <p className="text-gray-600">
              Get access to qualified candidates quickly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Flexible Workforce</h3>
            <p className="text-gray-600">
              Scale your team based on your needs.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600">
          Ongoing workforce support is included.
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="bg-white py-16 px-6 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-8">
            Industries We Support
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {[
              "Technology and software",
              "E-commerce and online businesses",
              "Consumer goods companies",
              "Insurance and financial services",
              "Healthcare organizations",
              "Real estate companies",
              "Professional services firms",
              "Universities and educational institutions",
              "Non-governmental organizations",
            ].map((item, i) => (
              <div key={i} className="bg-[#F7F7F7] p-4 rounded-lg">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#003F8E] text-white py-16 text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Start Hiring With Katel
        </h2>

        <p className="mb-6 text-gray-100">
          Build a reliable team that helps your organization grow.
        </p>

        <button
  onClick={() =>
    window.open(
      "https://forms.gle/o7evZJqwgeCzShYp8",
      "_blank"
    )
  }
  className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold"
>
  Start Hiring Today
</button>
      </section>
      <Footer/>
    </div>
  );
}