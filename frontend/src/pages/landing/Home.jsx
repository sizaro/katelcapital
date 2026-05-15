
import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Home() {
  const [openIndustry, setOpenIndustry] = useState(null);
  const [stats, setStats] = useState({
    professionals: 0,
    organizations: 0,
    interviews: 0,
    roles: 0,
  });

  useEffect(() => {
    const targets = {
      professionals: 25,
      organizations: 8,
      interviews: 120,
      roles: 35,
    };

    const interval = setInterval(() => {
      setStats((prev) => {
        const next = { ...prev };

        if (next.professionals < targets.professionals)
          next.professionals += 1;

        if (next.organizations < targets.organizations)
          next.organizations += 1;

        if (next.interviews < targets.interviews)
          next.interviews += 3;

        if (next.roles < targets.roles)
          next.roles += 1;

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const industries = [
    {
      title: "Non-Governmental Organizations (NGOs)",
      content:
        "Program support, administration, reporting, research, communications, and donor engagement.",
    },
    {
      title: "Universities & Educational Institutions",
      content:
        "Admissions support, student services, administration, research assistance, and digital learning support.",
    },
    {
      title: "Technology & Software Companies",
      content:
        "Customer support, technical support, data operations, software assistance, and project coordination.",
    },
    {
      title: "Financial Services",
      content:
        "Customer support, data entry, collections support, compliance administration, and client relationship management.",
    },
    {
      title: "Healthcare Organizations",
      content:
        "Appointment scheduling, patient support, records management, research support, and administrative coordination.",
    },
    {
      title: "E-commerce & Retail Businesses",
      content:
        "Customer support, order management, social media engagement, product listing, and sales support.",
    },
    {
      title: "Real Estate & Property Management",
      content:
        "Lead management, appointment scheduling, client follow-up, marketing support, and documentation.",
    },
    {
      title: "Professional Services Firms",
      content:
        "Administrative support, client coordination, research, bookkeeping support, and operations management.",
    },
    {
      title: "Telecommunications & Customer Service",
      content:
        "Customer care, technical support, lead generation, retention support, and call operations.",
    },
    {
      title: "Media, Marketing & Creative Agencies",
      content:
        "Social media management, content support, campaign coordination, design support, and client communication.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">

        <img
          src="/images/katel_capital_hero.jpg"
          alt="Katel Capital"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#003F8E]/75"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          <div className="text-center text-white max-w-4xl mx-auto">

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Unlock Talent. Build Smarter Teams
            </h1>

            <p className="text-lg md:text-2xl text-gray-100 leading-relaxed">
              Helping organizations hire faster, reduce costs, and build
              reliable remote teams while creating life-changing opportunities
              for skilled professionals across Uganda.
            </p>

          </div>

          {/* HERO CARDS */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">

            {/* HIRE TALENT */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">

              <h2 className="text-2xl font-bold text-[#003F8E] mb-4">
                Find Talent
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Get access to a wide range of pre-vetted professionals that are
                ready to join.
              </p>

              <button
                onClick={() =>
                  window.open(
                    "https://forms.gle/o7evZJqwgeCzShYp8",
                    "_blank"
                  )
                }
                className="bg-[#003F8E] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Hire Now
              </button>

            </div>

            {/* FIND WORK */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">

              <h2 className="text-2xl font-bold text-[#003F8E] mb-4">
                Find Remote Work
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Build a career without limits and connect with organizations
                looking for skilled professionals.
              </p>

              <button
                onClick={() =>
                  window.open(
                    "https://forms.gle/aLAvdJv3UQDVQL9R7",
                    "_blank"
                  )
                }
                className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Find Job
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* ================= HIRING CHALLENGES ================= */}
      <section className="py-20 px-6 bg-[#F7F7F7]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
              The Hiring Challenges Organizations Face
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              As organizations grow, hiring and workforce management become
              more complex. Katel helps businesses overcome these challenges
              with reliable remote workforce solutions.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                title: "Rising Hiring & Staffing Costs",
                text: "Reduce overhead expenses through flexible remote workforce solutions.",
              },
              {
                title: "Difficulty Finding Qualified Talent",
                text: "Access carefully screened professionals ready for remote work.",
              },
              {
                title: "Slow Recruitment Processes",
                text: "Interview qualified candidates within days instead of months.",
              },
              {
                title: "High Employee Turnover",
                text: "Improve long-term retention through better role matching and support.",
              },
              {
                title: "Internal HR Burden",
                text: "Katel handles sourcing, screening, and workforce coordination.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <h3 className="text-xl font-bold text-[#003F8E] mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= WHY KATEL ================= */}
      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
              Why Organizations Choose Katel
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              With Katel, organizations reduce costs, save time, and build
              dependable teams that support growth.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "Reduce Hiring Costs",
              "Save Valuable Time",
              "Access Carefully Vetted Talent",
              "Flexible Support & Ongoing Partnership",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#003F8E] text-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="font-bold text-lg leading-relaxed">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="bg-[#F7F7F7] py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
              Industries We Support
            </h2>

            <p className="text-gray-600">
              Katel provides remote workforce solutions across key sectors
              driving growth in Uganda.
            </p>

          </div>

          <div className="space-y-4">

            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
              >

                <button
                  onClick={() =>
                    setOpenIndustry(
                      openIndustry === index ? null : index
                    )
                  }
                  className="w-full text-left p-5 flex justify-between items-center"
                >

                  <span className="font-semibold text-[#003F8E]">
                    {industry.title}
                  </span>

                  <span className="text-2xl text-[#003F8E]">
                    {openIndustry === index ? "−" : "+"}
                  </span>

                </button>

                {openIndustry === index && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {industry.content}
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= TALENT SOLUTIONS ================= */}
      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
              Our Talent Solutions
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Katel connects organizations with skilled remote professionals
              who support operations, customer experience, growth, and business
              performance.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              "Customer Support",
              "Administrative Support",
              "Virtual Assistance",
              "Data Management",
              "Research Assistance",
              "Technical Support",
              "Sales & Customer Engagement",
              "Social Media & Digital Marketing",
              "Finance & Operations Support",
              "Project & Program Support",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-[#003F8E] text-lg">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ORGS ================= */}
      <section className="bg-[#003F8E] py-20 px-6 text-white">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Katel Works for Organizations
            </h2>

            <p className="text-gray-200">
              Simple hiring. Qualified talent. Long-term support.
            </p>

          </div>

          <div className="grid md:grid-cols-5 gap-6">

            {[
              "Share Your Hiring Needs",
              "Talent Matching",
              "Candidate Interviews",
              "Fast Onboarding",
              "Ongoing Support",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
              >

                <div className="w-12 h-12 rounded-full bg-[#F7C621] text-black font-bold flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>

                <h3 className="font-bold">
                  {step}
                </h3>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS PROFESSIONALS ================= */}
      <section className="py-20 px-6 bg-[#F7F7F7]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
              How Katel Works for Professionals
            </h2>

            <p className="text-gray-600">
              Build your career. Work remotely. Grow with confidence.
            </p>

          </div>

          <div className="grid md:grid-cols-5 gap-6">

            {[
              "Apply",
              "Screening & Assessment",
              "Interview Preparation",
              "Client Matching",
              "Start Working & Grow",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 shadow-sm text-center"
              >

                <div className="w-12 h-12 rounded-full bg-[#003F8E] text-white font-bold flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>

                <h3 className="font-bold text-[#003F8E]">
                  {step}
                </h3>

              </div>
            ))}

          </div>

        </div>
      </section>

            {/* ================= LIVE STATS ================= */}
      <section className="py-20 px-6 bg-[#F7F7F7] text-center">

        <h2 className="text-3xl font-bold text-[#003F8E] mb-10">
          Building Opportunity Across Uganda
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          <div>
            <h3 className="text-4xl font-bold text-[#003F8E]">{stats.professionals}+</h3>
            <p className="text-gray-600">Professionals in Network</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#003F8E]">{stats.organizations}+</h3>
            <p className="text-gray-600">Organizations Supported</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#003F8E]">{stats.interviews}+</h3>
            <p className="text-gray-600">Interviews Coordinated</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#003F8E]">{stats.roles}+</h3>
            <p className="text-gray-600">Roles Filled</p>
          </div>

        </div>
      </section>

      {/* ================= ABOUT SHORT ================= */}
      <section className="py-20 px-6 text-center">

        <h2 className="text-3xl font-bold text-[#003F8E] mb-4">
          About Katel
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Katel Capital connects organizations with skilled remote professionals across Uganda.
          We help businesses build dependable teams while creating meaningful career opportunities.
        </p>

      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-20 px-6 bg-[#003F8E] text-white">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-10">Our Impact</h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">

            <div>
              <h3 className="font-bold mb-2">Better Income Opportunities</h3>
              <p className="text-gray-200">Helping professionals access stable remote work.</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Supporting Business Growth</h3>
              <p className="text-gray-200">Helping organizations scale faster.</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Expanding Digital Employment</h3>
              <p className="text-gray-200">Growing Uganda’s remote workforce ecosystem.</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Empowering Young Professionals</h3>
              <p className="text-gray-200">Creating real career pathways.</p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
<section className="py-20 px-6 bg-[#F7F7F7]">

  <div className="max-w-7xl mx-auto text-center">

    <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
      What People Say About Katel
    </h2>

    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      Real experiences from organizations and professionals in our network.
    </p>

    {/* GRID */}
    <div className="grid md:grid-cols-2 gap-8">

      {/* ORGANIZATIONS */}
      <div className="bg-white p-8 rounded-xl shadow-sm border text-left">

        <h3 className="text-xl font-bold text-[#003F8E] mb-4">
          For Organizations
        </h3>

        <div className="space-y-6 text-gray-600">

          <div>
            <p className="italic">
              “Katel helped us find qualified support staff much faster than traditional hiring.”
            </p>
            <p className="mt-2 font-semibold text-[#003F8E]">
              — Operations Manager
            </p>
          </div>

          <div>
            <p className="italic">
              “We reduced our hiring time significantly and got reliable remote staff within days.”
            </p>
            <p className="mt-2 font-semibold text-[#003F8E]">
              — HR Lead, NGO Partner
            </p>
          </div>

        </div>

      </div>

      {/* PROFESSIONALS */}
      <div className="bg-white p-8 rounded-xl shadow-sm border text-left">

        <h3 className="text-xl font-bold text-[#003F8E] mb-4">
          For Professionals
        </h3>

        <div className="space-y-6 text-gray-600">

          <div>
            <p className="italic">
              “This opportunity helped me get my first remote job and improve my income.”
            </p>
            <p className="mt-2 font-semibold text-[#003F8E]">
              — Customer Support Agent
            </p>
          </div>

          <div>
            <p className="italic">
              “Katel guided me through interviews and helped me become confident in remote work.”
            </p>
            <p className="mt-2 font-semibold text-[#003F8E]">
              — Virtual Assistant
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>
      {/* ================= FINAL CTA ================= */}
      <section className="py-20 px-6 text-center">

        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-bold text-[#003F8E] mb-6">
            Build Reliable Teams With Confidence
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Whether you are hiring remote professionals or searching for new
            career opportunities, Katel Capital is ready to help you grow.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">

            <button
              onClick={() =>
                window.open(
                  "https://forms.gle/o7evZJqwgeCzShYp8",
                  "_blank"
                )
              }
              className="bg-[#003F8E] text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Start Hiring
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://forms.gle/aLAvdJv3UQDVQL9R7",
                  "_blank"
                )
              }
              className="border-2 border-[#003F8E] text-[#003F8E] px-8 py-4 rounded-xl font-semibold hover:bg-[#003F8E] hover:text-white transition"
            >
              Find Work
            </button>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}