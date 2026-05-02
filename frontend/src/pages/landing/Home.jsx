import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Home() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#003F8E] text-white px-6">
        <div className="text-center max-w-4xl">

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Unlock Talent. Build Stronger Teams.
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Katel Capital helps organizations grow by connecting them with
            skilled, reliable professionals ready to contribute from day one.
          </p>

          <p className="mb-10 text-gray-200">
            We simplify hiring, reduce staffing costs, and provide ongoing workforce
            support so organizations can focus on what matters most — building their mission.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90">
              Start Hiring
            </button>

            <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003F8E] transition">
              Join the Talent Network
            </button>
          </div>
        </div>
      </header>

      {/* ================= CHALLENGES ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003F8E]">
          A Smarter Way to Build Your Team
        </h2>

        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Many organizations struggle with hiring challenges such as cost, time,
          and finding qualified candidates. Katel Capital solves this.
        </p>

        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          {[
            "Rising payroll costs",
            "Long recruitment processes",
            "Difficulty finding qualified candidates",
            "High staff turnover",
            "Limited time to manage hiring",
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY KATEL ================= */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#003F8E]">
          Why Organizations Choose Katel
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <div>
            <h3 className="font-bold text-lg mb-2">Access Skilled Professionals</h3>
            <p className="text-gray-600">
              We connect you with educated, trained, and reliable professionals
              ready to contribute immediately.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Reduce Staffing Costs</h3>
            <p className="text-gray-600">
              Cut recruitment and HR expenses while maintaining high performance.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Hire Faster</h3>
            <p className="text-gray-600">
              Get matched with pre-screened candidates without long hiring delays.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Ongoing Support</h3>
            <p className="text-gray-600">
              We support both organizations and professionals for long-term success.
            </p>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#003F8E]">
          How Katel Works
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {[
            {
              title: "Share Your Needs",
              text: "Organizations describe the role they need."
            },
            {
              title: "Talent Matching",
              text: "We identify qualified professionals."
            },
            {
              title: "Interviews",
              text: "You select the best candidates."
            },
            {
              title: "Onboarding",
              text: "Professional joins your team."
            },
            {
              title: "Ongoing Support",
              text: "We support long-term success."
            },
          ].map((step, i) => (
            <div key={i} className="bg-white shadow-sm p-5 rounded-lg border">
              <h3 className="font-bold text-[#003F8E] mb-1">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.text}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-16 bg-[#003F8E] text-white text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Empowering Talent. Strengthening Organizations.
        </h2>

        <p className="max-w-3xl mx-auto text-gray-200">
          Katel bridges the gap between skilled professionals and organizations
          that need them, creating opportunity and impact across Africa.
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4 text-[#003F8E]">
          Build Your Team With Confidence
        </h2>

        <p className="text-gray-600 mb-6">
          Start hiring or join the talent network today.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-[#003F8E] text-white px-6 py-3 rounded-lg">
            Start Hiring
          </button>

          <button className="border border-[#003F8E] text-[#003F8E] px-6 py-3 rounded-lg">
            Join Talent Network
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}