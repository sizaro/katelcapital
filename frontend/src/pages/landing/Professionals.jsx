import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Professionals() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F7F7F7] min-h-screen">

    <Navbar/>
      {/* ================= HERO ================= */}
      <section className="bg-[#003F8E] text-white py-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Build a Career Without Limits
        </h1>

        <p className="max-w-3xl mx-auto text-gray-100 text-lg">
          Katel Capital connects skilled professionals with real opportunities
          from trusted organizations that value their abilities.
        </p>
      </section>

      {/* ================= CHALLENGES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
          Challenges Many Professionals Face
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <ul className="space-y-2 list-disc pl-5">
            <li>Low wages</li>
            <li>Limited career opportunities</li>
            <li>Long commuting hours</li>
          </ul>

          <ul className="space-y-2 list-disc pl-5">
            <li>Limited professional development</li>
            <li>Unstable job access</li>
          </ul>
        </div>

        <p className="mt-6 text-gray-600">
          Katel helps professionals overcome these challenges by connecting them
          with organizations that need their skills.
        </p>
      </section>

      {/* ================= OPPORTUNITIES ================= */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-6">
            Opportunities Available
          </h2>

          <p className="text-gray-600 mb-8">
            Professionals in our network may work in roles such as:
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Customer support representatives",
              "Administrative assistants",
              "Virtual assistants",
              "Data entry specialists",
              "Research assistants",
              "Technical support professionals",
              "Sales support representatives",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#F7F7F7] p-4 rounded-lg shadow-sm border"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003F8E] mb-8">
          Why Join Katel
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Competitive Pay</h3>
            <p className="text-gray-600">
              Many professionals earn better income compared to traditional roles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Remote Opportunities</h3>
            <p className="text-gray-600">
              Work from anywhere and reduce commuting time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Career Growth</h3>
            <p className="text-gray-600">
              Gain experience through real organizational work.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600">
          Supportive community and mentorship included.
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#003F8E] text-white py-16 text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join the Katel Talent Network
        </h2>

        <p className="mb-6 text-gray-100">
          Take the next step toward a stronger professional future.
        </p>

        <button
          onClick={() =>
            window.open("https://forms.gle/YOUR_GOOGLE_FORM_LINK", "_blank")
          }
          className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold"
        >
          Apply Today
        </button>
      </section>

      <Footer/>
    </div>
  );
}