import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Services() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-[#003F8E] text-white py-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Workforce Support for Growing Organizations
        </h1>

        <p className="max-w-3xl mx-auto text-gray-100 text-lg">
          Katel Capital provides professional services that help organizations
          operate efficiently and grow sustainably.
        </p>
      </section>

      {/* ================= CUSTOMER SUPPORT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
          Customer Support Services
        </h2>

        <p className="text-gray-600 mb-6">
          Customer support professionals help organizations maintain strong
          relationships with their customers.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
          {[
            "Customer support representatives",
            "Live chat agents",
            "Call center representatives",
            "Technical support agents",
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= ADMIN SUPPORT ================= */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
            Administrative Support
          </h2>

          <p className="text-gray-600 mb-6">
            Administrative professionals help organizations stay organized and
            productive.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
            {[
              "Virtual assistance",
              "Email management",
              "Scheduling support",
              "Document preparation",
              "Back-office support",
            ].map((item, i) => (
              <div key={i} className="bg-[#F7F7F7] p-4 rounded-lg">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DATA & RESEARCH ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
          Data and Research Support
        </h2>

        <p className="text-gray-600 mb-6">
          Professionals help organizations manage and analyze information.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
          {[
            "Data entry",
            "Research assistance",
            "Database support",
            "Reporting",
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= SALES SUPPORT ================= */}
      <section className="bg-white py-16 px-6 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
            Sales and Business Support
          </h2>

          <p className="text-gray-600 mb-6">
            Professionals help organizations grow their customer base and
            maintain relationships.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
            {[
              "Lead generation",
              "Appointment scheduling",
              "Customer follow-ups",
              "Sales support",
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
          Need Reliable Workforce Support?
        </h2>

        <p className="mb-6 text-gray-100">
          Katel connects you with professionals ready to deliver results.
        </p>

        <button
          onClick={() =>
            window.open("https://forms.gle/YOUR_GOOGLE_FORM_LINK", "_blank")
          }
          className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold"
        >
          Request Talent
        </button>
      </section>

      <Footer />
    </div>
  );
}