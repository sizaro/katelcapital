import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now we just open email or Google Form later
    window.open("https://forms.gle/YOUR_GOOGLE_FORM_LINK", "_blank");
  };

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-[#003F8E] text-white py-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Let’s Build Something Together
        </h1>

        <p className="max-w-3xl mx-auto text-gray-100 text-lg">
          Whether you are an organization seeking talent or a professional
          seeking opportunity, we would love to hear from you.
        </p>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#003F8E] mb-6 text-center">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="organization"
              placeholder="Organization (optional)"
              value={form.organization}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full border p-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#003F8E] text-white py-3 rounded-lg font-semibold hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}