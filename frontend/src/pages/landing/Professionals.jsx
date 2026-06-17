import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Professionals() {

  return (
    <div className="bg-[#F7F7F7] min-h-screen">

      <Navbar />


      {/* ================= HERO ================= */}

      <section className="bg-[#003F8E] text-white py-24 px-6 text-center">

        <h1 className="text-3xl md:text-5xl font-bold mb-5">
          With Katel, Talent Meets Opportunity
        </h1>

        <p className="max-w-3xl mx-auto text-gray-100 text-lg leading-8">
          Build your career, increase your income, and access flexible remote
          work designed for long-term growth.
        </p>

      </section>



      <section className="max-w-6xl mx-auto px-6 py-20">

  {/* ================= HEADER ================= */}


    {/* ================= Challenges ================= */}

  <div className="mb-12 reveal delay-100">
    <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
      Career Challenges Many Professionals Face
    </h2>

    <p className="text-gray-600 text-lg leading-7 max-w-3xl reveal delay-200">
      Many skilled professionals have the education, ability, and ambition—but still struggle to access meaningful opportunities. Katel helps bridge that gap.
    </p>
  </div>

  {/* ================= GRID CARDS ================= */}
  <div className="grid md:grid-cols-2 gap-6">

    {/* CARD 1 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm reveal delay-200 hover:shadow-md transition">
      <h3 className="font-bold text-lg text-[#003F8E] mb-3">
        1. Low Income Opportunities
      </h3>

      <p className="text-gray-600 mb-3 leading-7">
        Many professionals work hard but remain underpaid, making it difficult to build financial stability or support their long-term goals.
      </p>

      <p className="font-semibold text-[#003F8E] mb-2">
        How Katel Helps
      </p>

      <p className="text-gray-600">
        Access better-paying remote opportunities with organizations that value skill, professionalism, and performance.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm reveal delay-300 hover:shadow-md transition">
      <h3 className="font-bold text-lg text-[#003F8E] mb-3">
        2. Limited Career Growth
      </h3>

      <p className="text-gray-600 mb-3 leading-7">
        Many roles offer little learning, promotion, or exposure to professional environments, slowing career progress.
      </p>

      <p className="font-semibold text-[#003F8E] mb-2">
        How Katel Helps
      </p>

      <p className="text-gray-600">
        Work with growing organizations, gain real-world experience, and build skills that strengthen your career.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm reveal delay-400 hover:shadow-md transition">
      <h3 className="font-bold text-lg text-[#003F8E] mb-3">
        3. Long and Costly Commuting
      </h3>

      <p className="text-gray-600 mb-3 leading-7">
        Daily transport costs, traffic, and long travel hours reduce productivity, income, and work-life balance.
      </p>

      <p className="font-semibold text-[#003F8E] mb-2">
        How Katel Helps
      </p>

      <p className="text-gray-600">
        Access remote work opportunities that allow you to work from home or flexible locations while saving time and money.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm reveal delay-500 hover:shadow-md transition">
      <h3 className="font-bold text-lg text-[#003F8E] mb-3">
        4. Unstable Job Opportunities
      </h3>

      <p className="text-gray-600 mb-3 leading-7">
        Many talented professionals struggle with short-term contracts, unemployment, or inconsistent work opportunities.
      </p>

      <p className="font-semibold text-[#003F8E] mb-2">
        How Katel Helps
      </p>

      <p className="text-gray-600">
        Join a professional talent network connected to organizations actively looking for reliable talent.
      </p>
    </div>

    {/* CARD 5 (FULL WIDTH) */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm md:col-span-2 reveal delay-500 hover:shadow-md transition">

      <h3 className="font-bold text-lg text-[#003F8E] mb-3">
        5. Lack of Professional Support
      </h3>

      <p className="text-gray-600 mb-3 leading-7">
        Many professionals enter jobs without mentorship, guidance, or feedback, making growth and performance difficult.
      </p>

      <p className="font-semibold text-[#003F8E] mb-2">
        How Katel Helps
      </p>

      <p className="text-gray-600">
        Katel provides screening support, interview preparation, workforce guidance, and ongoing career support.
      </p>
    </div>

  </div>
</section>



<section className="max-w-6xl mx-auto px-6 py-24">

  {/* ================= HEADER ================= */}
  <div className="text-center mb-14 reveal delay-100">

    <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
      About Katel
    </h2>

    <p className="text-xl font-semibold text-gray-800 mb-4">
      Transforming Talent. Strengthening Organizations. Building Uganda’s Future.
    </p>

    <p className="text-gray-600 max-w-3xl mx-auto leading-7 reveal delay-200">
      At Katel Capital, we believe talent exists everywhere, but opportunity does not always reach everyone.
      Our mission is to bridge that gap by connecting skilled professionals with organizations that need reliable talent.
      Every connection we create has the potential to change lives, strengthen businesses, and contribute to a more productive workforce in Uganda.
    </p>

  </div>

  {/* ================= MISSION + VISION ================= */}
  <div className="grid md:grid-cols-2 gap-8">

    {/* ================= MISSION CARD ================= */}
    <div className="bg-white border rounded-2xl p-8 shadow-sm reveal delay-300 hover:shadow-md transition">

      <h3 className="text-2xl font-bold text-[#003F8E] mb-4">
        Our Mission
      </h3>

      <p className="text-gray-600 leading-7">
        To help organizations access dependable, high-quality talent while creating meaningful remote career opportunities for skilled professionals across Uganda.
      </p>

    </div>

    {/* ================= VISION CARD ================= */}
    <div className="bg-white border rounded-2xl p-8 shadow-sm reveal delay-400 hover:shadow-md transition">

      <h3 className="text-2xl font-bold text-[#003F8E] mb-4">
        Our Vision
      </h3>

      <p className="text-gray-600 leading-7">
        To build a future where talented professionals can thrive regardless of location, and organizations can grow with access to trusted, flexible workforce solutions.
      </p>

    </div>

  </div>

</section>



<section className="bg-[#F7F7F7] py-24 px-6">

  {/* ================= HEADER ================= */}
  <div className="max-w-6xl mx-auto text-center mb-14">

    <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4 reveal delay-100">
      The Impact We Aim to Create
    </h2>

    <p className="text-gray-600 max-w-3xl mx-auto reveal delay-200">
      Building opportunities that strengthen individuals, organizations, and entire communities across Uganda.
    </p>

  </div>

  {/* ================= IMPACT GRID ================= */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

    {/* ================= CARD 1 ================= */}
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition reveal delay-300">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        Empowering Professionals
      </h3>

      <p className="text-gray-600 leading-7">
        Creating access to better-paying opportunities, flexible work, and long-term career growth.
      </p>

    </div>

    {/* ================= CARD 2 ================= */}
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition reveal delay-400">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        Supporting Organizations
      </h3>

      <p className="text-gray-600 leading-7">
        Helping businesses, universities, NGOs, and institutions hire faster, reduce costs, and build stronger teams.
      </p>

    </div>

    {/* ================= CARD 3 ================= */}
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition reveal delay-500">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        Strengthening Communities
      </h3>

      <p className="text-gray-600 leading-7">
        When professionals earn better and work flexibly, families become stronger, communities grow, and local economies benefit.
      </p>

    </div>

    {/* ================= CARD 4 ================= */}
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition reveal delay-500">

      <h3 className="text-xl font-bold text-[#003F8E] mb-3">
        Advancing Uganda’s Workforce
      </h3>

      <p className="text-gray-600 leading-7">
        Helping Uganda embrace remote work, digital employment, and a more globally competitive workforce.
      </p>

    </div>

  </div>

</section>


<section className="bg-white py-24 px-6">

  <div className="max-w-5xl mx-auto text-center">

    {/* ================= HEADER ================= */}
    <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-10 reveal delay-100">
      Why Katel Exists
    </h2>

    {/* ================= CORE STATEMENT ================= */}
    <div className="bg-[#F7F7F7] rounded-2xl p-10 shadow-sm border mb-10 reveal delay-200">

      <p className="text-lg text-gray-700 leading-8 mb-6">
        Katel was founded on a simple belief:
      </p>

      <p className="text-xl font-semibold text-[#003F8E] mb-6">
        Skilled people should not be limited by geography.
      </p>

      <p className="text-xl font-semibold text-[#003F8E] mb-6">
        Organizations should not struggle to find dependable talent.
      </p>

      <p className="text-lg text-gray-700 leading-8">
        By bridging these two realities, Katel is building more than careers and teams — we are building opportunity.
      </p>

    </div>

    {/* ================= FINAL EMPHASIS ================= */}
    <p className="text-gray-600 max-w-3xl mx-auto mb-10 reveal delay-300">
      A future where talent is accessible, work is flexible, and opportunity is no longer limited by location.
    </p>

  </div>

</section>


<section className="bg-[#F7F7F7] py-24 px-6">

  <div className="max-w-5xl mx-auto text-center">

    {/* ================= MAIN STATEMENT ================= */}
    <h2 className="text-3xl md:text-5xl font-bold text-[#003F8E] mb-8 reveal delay-100 leading-tight">
      With Katel, Talent Meets Opportunity.
    </h2>

    {/* ================= SUB STATEMENT CARD ================= */}
    <div className="bg-white border rounded-2xl shadow-sm p-10 md:p-12 mb-12 reveal delay-200">

      <p className="text-lg md:text-xl text-gray-700 leading-8 font-medium">
        Build your career, increase your income, and access flexible work designed for long-term growth.
      </p>

    </div>

    {/* ================= VISUAL DIVIDER ================= */}
    <div className="flex items-center justify-center mb-10 reveal delay-300">
      <div className="h-[1px] w-24 bg-gray-300"></div>
      <div className="mx-4 text-[#003F8E] font-semibold text-sm tracking-widest">
        KATEL CAPITAL
      </div>
      <div className="h-[1px] w-24 bg-gray-300"></div>
    </div>

    {/* ================= OPTIONAL CTA (clean and subtle) ================= */}
    <button
      onClick={() =>
        window.open("https://forms.gle/aLAvdJv3UQDVQL9R7", "_blank")
      }
      className="bg-[#003F8E] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition reveal delay-400"
    >
      Join the Talent Network
    </button>

  </div>

</section>

      <Footer />


    </div>
  );
}