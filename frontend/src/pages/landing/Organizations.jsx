import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Organizations() {
  const navigate = useNavigate();


  
 const [openIndex, setOpenIndex] = useState(null);

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
        "Customer support, data entry, collections support, compliance administration, and client relationship management. (Banks, SACCOs, microfinance, fintech, insurance)",
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
        "Administrative support, client coordination, research, bookkeeping support, and operations management. (Legal, consulting, accounting firms)",
    },
    {
      title: "Telecommunications & Customer Service Businesses",
      content:
        "Customer care, technical support, lead generation, retention support, and call operations.",
    },
    {
      title: "Media, Marketing & Creative Agencies",
      content:
        "Social media management, content support, campaign coordination, design support, and client communication.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const [open, setOpen] = useState(null);

  const solutions = [
    {
      title: "Customer Support",
      content:
        "Professionals who manage customer inquiries, live chat, email support, call handling, and client issue resolution to improve customer satisfaction."
    },
    {
      title: "Administrative Support",
      content:
        "Organized professionals who assist with scheduling, documentation, reporting, internal coordination, and day-to-day business operations."
    },
    {
      title: "Virtual Assistance",
      content:
        "Remote assistants who help executives and teams manage calendars, communication, travel coordination, research, and task follow-up."
    },
    {
      title: "Data Management",
      content:
        "Professionals skilled in data entry, record management, database updates, reporting, and maintaining accurate business information."
    },
    {
      title: "Research Assistance",
      content:
        "Support for market research, academic research, donor research, project analysis, and information gathering for informed decision-making."
    },
    {
      title: "Technical Support",
      content:
        "IT and support professionals who help users resolve technical issues, software challenges, system troubleshooting, and digital platform support."
    },
    {
      title: "Sales & Customer Engagement",
      content:
        "Professionals focused on lead generation, client follow-up, appointment setting, relationship management, and sales support."
    },
    {
      title: "Social Media & Digital Marketing",
      content:
        "Creative professionals who manage social platforms, content scheduling, audience engagement, digital campaigns, and online brand visibility."
    },
    {
      title: "Finance & Operations Support",
      content:
        "Professionals who assist with bookkeeping, invoice tracking, payment follow-up, financial reporting, and operational coordination."
    },
    {
      title: "Project & Program Support",
      content:
        "Professionals who help manage project documentation, stakeholder communication, reporting, scheduling, and implementation support. Especially valuable for NGOs, universities, and consulting organizations."
    }
  ];




  const [click, setClick] = useState(null);

  const items = [
    {
      title: "Reduce Hiring Costs",
      content:
        "Building in-house teams comes with salaries, office space, equipment, benefits, and recruitment expenses. Katel helps organizations access skilled remote professionals while significantly reducing operational and staffing costs."
    },
    {
      title: "Save Valuable Time",
      content:
        "Traditional recruitment can take weeks or even months. Katel gives organizations access to pre-screened, job-ready professionals, allowing teams to fill important roles faster and keep operations moving."
    },
    {
      title: "Access Carefully Vetted Talent",
      content:
        "Every professional in the Katel network goes through structured screening for communication, technical skills, professionalism, and remote work readiness before being matched with clients."
    },
    {
      title: "Flexible Support with Ongoing Partnership",
      content:
        "Whether you need one professional or a growing team, Katel provides flexible workforce solutions with continuous support to ensure long-term performance and business continuity."
    }
  ];

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
      

    {/* ================= CHALLENGES ================= */}
<section className="max-w-6xl mx-auto px-6 py-20">

  {/* HEADER */}
  <div className="text-center max-w-4xl mx-auto mb-14">

    <h2 className="text-2xl md:text-4xl font-bold text-[#003F8E] mb-6 reveal delay-100">
      The Hiring Challenges Organizations Face
    </h2>

    <p className="text-gray-600 text-lg leading-7 reveal delay-200">
      As organizations grow, hiring and workforce management become more complex.
      Katel helps businesses overcome the most common workforce challenges with
      reliable remote talent solutions.
    </p>

  </div>

  {/* CARDS */}
  <div className="space-y-10">

    {/* CARD 1 */}
    <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 reveal delay-100">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        1. Rising Hiring & Staffing Costs
      </h3>

      <p className="text-gray-600 mb-5 leading-7">
        Recruiting full-time employees often comes with salaries, office space,
        equipment, benefits, and other operational expenses that can slow business growth.
      </p>

      <div className="bg-[#F7F7F7] p-5 rounded-xl border-l-4 border-[#003F8E]">
        <p className="font-semibold text-[#003F8E] mb-1">
          How Katel Solves It
        </p>
        <p className="text-gray-700 leading-7">
          Katel provides skilled remote professionals through a flexible workforce model,
          helping organizations reduce overhead costs while maintaining quality and productivity.
        </p>
      </div>

    </div>

    {/* CARD 2 */}
    <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 reveal delay-200">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        2. Difficulty Finding Qualified Talent
      </h3>

      <p className="text-gray-600 mb-5 leading-7">
        Many organizations spend valuable time interviewing candidates who lack the communication skills,
        professionalism, or experience needed for the role.
      </p>

      <div className="bg-[#F7F7F7] p-5 rounded-xl border-l-4 border-[#003F8E]">
        <p className="font-semibold text-[#003F8E] mb-1">
          How Katel Solves It
        </p>
        <p className="text-gray-700 leading-7">
          Every professional in the Katel network is carefully screened for communication,
          technical skills, professionalism, and remote work readiness before being introduced to clients.
        </p>
      </div>

    </div>

    {/* CARD 3 */}
    <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 reveal delay-300">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        3. Slow and Time-Consuming Recruitment
      </h3>

      <p className="text-gray-600 mb-5 leading-7">
        Traditional hiring can take weeks or months, delaying projects, customer support,
        and business operations.
      </p>

      <div className="bg-[#F7F7F7] p-5 rounded-xl border-l-4 border-[#003F8E]">
        <p className="font-semibold text-[#003F8E] mb-1">
          How Katel Solves It
        </p>
        <p className="text-gray-700 leading-7">
          Katel maintains a growing pool of pre-screened professionals, allowing organizations
          to start interviewing qualified candidates within days, not months.
        </p>
      </div>

    </div>

    {/* CARD 4 */}
    <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 reveal delay-400">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        4. High Employee Turnover
      </h3>

      <p className="text-gray-600 mb-5 leading-7">
        Frequent staff changes disrupt operations, reduce team consistency, and increase retraining costs.
      </p>

      <div className="bg-[#F7F7F7] p-5 rounded-xl border-l-4 border-[#003F8E]">
        <p className="font-semibold text-[#003F8E] mb-1">
          How Katel Solves It
        </p>
        <p className="text-gray-700 leading-7">
          Katel focuses on role matching, contractor support, and continuous workforce coordination
          to improve retention and long-term performance.
        </p>
      </div>

    </div>

    {/* CARD 5 */}
    <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 reveal delay-500">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        5. Internal HR and Administrative Burden
      </h3>

      <p className="text-gray-600 mb-5 leading-7">
        Managing sourcing, interviews, onboarding, contracts, and workforce coordination takes time
        away from leadership and core business priorities.
      </p>

      <div className="bg-[#F7F7F7] p-5 rounded-xl border-l-4 border-[#003F8E]">
        <p className="font-semibold text-[#003F8E] mb-1">
          How Katel Solves It
        </p>
        <p className="text-gray-700 leading-7">
          Katel handles talent sourcing, screening, contractor coordination, and workforce support,
          allowing organizations to focus on growth while we handle workforce operations.
        </p>
      </div>

    </div>

  </div>

  {/* FINAL SUMMARY */}
  <div className="text-center mt-14 reveal delay-500">

    <p className="text-lg font-semibold text-[#003F8E]">
      With Katel, Organizations Hire Faster, Reduce Costs, and Build Reliable Teams.
    </p>

  </div>

</section>







    <section className="bg-white py-20 px-6 border-t">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-[#003F8E] reveal delay-100">
          Industries We Support
        </h2>

        <p className="text-gray-600 mt-4 reveal delay-200">
          Katel provides remote workforce solutions across key sectors driving growth in Uganda.
        </p>
      </div>

      {/* ACCORDION */}
      <div className="max-w-4xl mx-auto space-y-4">

        {industries.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden shadow-sm"
          >

            {/* BUTTON */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-5 py-4 bg-[#F7F7F7] hover:bg-gray-100 transition"
            >
              <span className="font-semibold text-[#003F8E] text-left">
                {item.title}
              </span>

              <span className="text-[#003F8E] text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* DROPDOWN CONTENT */}
            <div
              className={`px-5 overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? "max-h-40 py-4 opacity-100"
                  : "max-h-0 py-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 leading-7">
                {item.content}
              </p>
            </div>

          </div>
        ))}

      </div>

    </section>
  

    <section className="bg-[#F7F7F7] py-20 px-6">

      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
          Our Talent Solutions
        </h2>

        <p className="text-gray-600">
          Katel connects organizations with skilled remote professionals who can support daily operations, customer experience, growth, and specialized business functions.
        </p>
      </div>

      {/* ACCORDION */}
      <div className="max-w-4xl mx-auto space-y-3">

        {solutions.map((item, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl shadow-sm overflow-hidden transition"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="font-semibold text-[#003F8E]">
                {item.title}
              </span>

              <span className="text-xl text-[#003F8E]">
                {open === i ? "−" : "+"}
              </span>
            </button>

            {open === i && (
              <div className="px-5 pb-5 text-gray-700 leading-relaxed animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        ))}

      </div>

      {/* QUALITY PROMISE */}
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold text-[#003F8E] mb-2">
            Quality Promise
          </h3>
          <p className="text-gray-600">
            Every Katel professional is carefully screened for communication, technical ability, professionalism, and remote work readiness before being matched with an organization.
          </p>
        </div>
      </div>

    </section>



    <section className="bg-[#F7F7F7] py-20 px-6">

      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
          Why Organizations Choose Katel
        </h2>
      </div>

      {/* ACCORDION */}
      <div className="max-w-4xl mx-auto space-y-3">

        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setClick(click === i ? null : i)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="font-semibold text-[#003F8E]">
                {item.title}
              </span>

              <span className="text-xl text-[#003F8E]">
                {click === i ? "−" : "+"}
              </span>
            </button>

            {click === i && (
              <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        ))}

      </div>

      {/* CLOSING LINE */}
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-gray-700 font-medium">
            With Katel, organizations reduce costs, save time, and build dependable teams that support growth.
          </p>
        </div>
      </div>



        
    </section>

        <div className="max-w-4xl mx-auto mt-10 text-center">
           {/* CTA BUTTON */}
          <button
            onClick={() =>
              window.open("https://forms.gle/o7evZJqwgeCzShYp8", "_blank")
            }
            className="bg-[#003F8E] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition "
          >
            Start Hiring With Katel
          </button>
        </div>
      <Footer/>
    </div>
  );
}