

import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />

      <HowKatelWorks />

      <WhyKatel />

      <Industries />

      <TalentSolutions />

      <LiveStats />

      <About />

      <Impact />

      <Testimonials />

      <FAQ />
      <CTA />
      <Footer/>
    </div>
  );
}



const Hero = () => {
  const [activeTab, setActiveTab] = useState("organizations");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const images = document.querySelectorAll(".parallax");

      images.forEach((img, i) => {
        const speed = 0.15 + i * 0.1;
        img.style.transform = `translateY(${offset * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 6);
    }, 30000);

    return () => clearInterval(interval);
  }, []);


  const heroImages = [
    "/images/katel_hero1.jpg",
    "/images/katel_capital_hero2.jpg",
    "/images/katel_capital_hero4.avif",
    "/images/katel_capital_hero5.jpg",
    "/images/katel_capital_hero6.jpg",
    "/images/katel_capital_hero7.webp",
  ];


  const tabContent = {
    organizations: {
      text:
        "Get access to a wide range of pre-vetted professionals that are ready to join.",
      button: "Hire Now",
      action: () => (window.location.href = "/organizations"),
    },

    professionals: {
      text:
        "Build a career without limits and connect with organizations looking for skilled professionals.",
      button: "Find Job",
      action: () => (window.location.href = "/professionals"),
    },
  };


  return (
    <header className="-mt-14 md:-mt-2 hero min-h-[90vh] lg:h-[80vh] flex flex-col justify-center items-center">


      {/* BACKGROUND */}
      <div className="hero-gradient" />
      <div className="hero-radial" />


      {/* BLOBS */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />


      <div className="hero-container">

        <div className="
          hero-grid
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          items-center
        ">


          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col">


            {/* HEADING FIRST MOBILE */}
            <h1
              className="
              reveal delay-100
              text-white
              text-[20px]
              text-center
              md:text-left
              md:text-[40px]
              lg:text-[50px]
              order-1
              lg:order-1
              "
            >
              Unlock Talent.
              <br />
              Build Smarter Teams
            </h1>



            {/* IMAGE MOVED HERE ONLY MOBILE */}
            <div
              className="
              flex
              justify-center
              items-center
              reveal
              delay-200
              order-2
              lg:hidden
              md:absolute
              md:right-4
              top-0
              md:mt-8
              mt-5
              inset=0
              right-3
              "
            >

              <div
                className="
                relative
                min-w-[150px]
                min-h-[150px]
                max-w-[300]
                max-h-[300]
                md:w-[320px]
                md:h-[320px]
                rounded-full
                overflow-hidden
                border-4
                border-white/20
                shadow-2xl
                "
              >

                <img
                  key={currentImage}
                  src={heroImages[currentImage]}
                  alt="Katel Capital"
                  className="
                  w-full
                  h-full
                  object-cover
                  transition-all
                  duration-1000
                  "
                />

              </div>

            </div>



            {/* DESCRIPTION */}
            <p
              className="
              reveal delay-300
              text-white
              text-md
              mt-8
              order-3
              lg:order-2
              md:w-[400px]
              lg:w-auto
              "
            >
              Helping organizations hire faster, reduce costs, and build
              reliable remote teams while creating life-changing opportunities
              across Uganda.
            </p>




            {/* BUTTON GROUP - SAME STYLING */}
            <div
              className="
              min-w-10
              max-w-[250px]
              md:min-w-[100px]
              md:max-w-[500px]
              lg:min-w-[500px]
              lg:max-w-[600px]
              flex
              items-center
              justify-start
              gap-0
              mt-6
              reveal
              delay-400
              order-4
              lg:order-3
              bg-transparent
              bg-white/10
              text-white
              py-0
              rounded-full
              "
            >


              <button
  onClick={() => setActiveTab("organizations")}
  className={`
    text-white
    transition
    rounded-full
    ${
      activeTab === "organizations"
        ? `
          border border-white
          bg-white/5
          z-20
          md:px-20 md:py-2
          lg:px-25
          px-5 py-1
        `
        : `
          text-left
          lg:ml-25
          md:ml-20
          ml-6
        `
    }
  `}
>
  Hire Talent
</button>


<button
  onClick={() => setActiveTab("professionals")}
  className={`
    text-white
    transition
    rounded-full
    ${
      activeTab === "professionals"
        ? `
          border border-white
          bg-white/5
          z-20
          md:px-24 md:py-2
          lg:px-26
          px-6 py-1
          lg:ml-21
          md:ml-19
          ml-6
        `
        : `
          text-right
          lg:ml-25
          md:ml-20
          ml-6
        `
    }
  `}
>
  Find Work
</button>


            </div>





            {/* DYNAMIC CONTENT */}
            <div
              className="
              mt-8
              max-w-lg
              reveal
              delay-500
              order-5
              lg:order-4
              "
            >

              <p className="
                text-white/80
                text-lg
                leading-relaxed
                mb-5
              ">
                {tabContent[activeTab].text}
              </p>



              <button
                onClick={tabContent[activeTab].action}
                className="
                  bg-[#F7C621]
                  text-black
                  px-6
                  py-1
                  rounded-full
                  font-semibold
                  hover:opacity-90
                  transition
                  -mb-10
                "
              >
                {tabContent[activeTab].button}
              </button>


            </div>


          </div>






          {/* ================= DESKTOP IMAGE ONLY ================= */}
          <div
            className="
            hidden
            lg:flex
            justify-center
            items-center
            reveal
            delay-500
            -mt-15
            "
          >

            <div
              className="
              relative
              w-[320px]
              h-[320px]
              md:w-[500px]
              md:h-[500px]
              rounded-full
              overflow-hidden
              border-4
              border-white/20
              shadow-2xl
              "
            >

              <img
                key={currentImage}
                src={heroImages[currentImage]}
                alt="Katel Capital"
                className="
                w-full
                h-full
                object-cover
                transition-all
                duration-1000
                "
              />

            </div>

          </div>



        </div>

      </div>


    </header>
  );
};

const HowKatelWorks = () => {

  const [activeTab, setActiveTab] = useState("organizations");
  const navigate = useNavigate();


  const orgSteps = [
    "Share Your Hiring Needs",
    "Talent Matching",
    "Candidate Interviews",
    "Fast Onboarding",
    "Ongoing Support",
  ];


  const proSteps = [
    "Apply",
    "Screening & Assessment",
    "Interview Preparation",
    "Client Matching",
    "Start Working & Grow",
  ];


  const steps =
    activeTab === "organizations"
      ? orgSteps
      : proSteps;



  return (

    <>

      {/* ================= INTRO ================= */}

      <section className="
        bg-gradient-to-br
    from-blue-400
    via-[#003F8E]
    to-blue-500
        text-white
        py-24
        px-6
        text-center
      ">

        <div className="max-w-5xl mx-auto">


          <h1 className="
            text-4xl
            md:text-5xl
            font-bold
            mb-6
          ">

            Build Strong Teams.
            <br/>
            Create Better Career Opportunities.

          </h1>


          <p className="
  text-xl
  text-gray-200
  max-w-3xl
  mx-auto
  leading-relaxed
">

  Katel helps organizations build reliable teams with skilled remote
  professionals while helping talented people access better career
  opportunities and flexible work.

</p>


          <p className="
            mt-6
            text-lg
            text-gray-200
          ">

            Flexible workforce solutions.
            Real talent.
            Long-term growth.

          </p>


        </div>

      </section>




      {/* ================= SWITCH BUTTONS ================= */}


      <section className="py-10 bg-gray flex flex-col items-center">


        <div className="
          max-w-3xl
          mx-auto
          flex
          flex-col
          justify-center
          gap-4
          px-6
        ">
          <div className="flex flex-col items-center mb-6">

  <div
    className="
      relative
      bg-[#003F8E]
      text-white
      px-8
      py-3
      rounded-xl
      font-bold
      shadow-lg
    "
  >

    How Katel Works


    <div
      className="
        absolute
        left-1/2
        -bottom-3
        -translate-x-1/2
        w-0
        h-0
        border-l-[12px]
        border-l-transparent
        border-r-[12px]
        border-r-transparent
        border-t-[12px]
        border-t-[#003F8E]
      "
    />

  </div>

</div>   

         <div className="flex gap-10">
           <button
            onClick={() => setActiveTab("organizations")}

            className={`
              px-8
              py-3
              rounded-full
              font-semibold
              transition

              ${
                activeTab === "organizations"
                ?
                "bg-[#003F8E] text-white shadow-lg"
                :
                "border border-[#003F8E] text-[#003F8E]"
              }
            `}
          >
            Organizations
          </button>



          <button
            onClick={() => setActiveTab("professionals")}

            className={`
              px-8
              py-3
              rounded-full
              font-semibold
              transition

              ${
                activeTab === "professionals"
                ?
                "bg-[#003F8E] text-white shadow-lg"
                :
                "border border-[#003F8E] text-[#003F8E]"
              }
            `}
          >
            Professionals
          </button>
         </div>


        </div>


      </section>





      {/* ================= HOW IT WORKS ================= */}


      <section
        className={`
          py-20
          px-6

          ${
            activeTab === "organizations"
            ?
            "bg-[#003F8E] text-white"
            :
            "bg-[#F7F7F7]"
          }

        `}
      >


        <div className="max-w-7xl mx-auto">


          <div className="text-center mb-16">


            <h2 className={`
              text-3xl
              md:text-4xl
              font-bold
              mb-4

              ${
                activeTab === "organizations"
                ?
                "text-white"
                :
                "text-[#003F8E]"
              }
            `}>


            </h2>


            <p className={`
              ${
                activeTab === "organizations"
                ?
                "text-gray-200"
                :
                "text-gray-600"
              }
            `}>


              {activeTab === "organizations"
              ?
              "Simple hiring. Qualified talent. Long-term support."
              :
              "Build your career. Work remotely. Grow with confidence."
              }


            </p>


          </div>





          <div className="
            grid
            md:grid-cols-5
            gap-6
          ">


            {steps.map((step,i)=>(

              <div
                key={i}
                className={`
                  rounded-xl
                  p-6
                  text-center
                  transition
                  
                  ${
                    activeTab === "organizations"
                    ?
                    "bg-white/10 border border-white/20"
                    :
                    "bg-white border shadow-sm"
                  }

                `}
              >


                <div className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                  font-bold

                  ${
                    activeTab === "organizations"
                    ?
                    "bg-[#F7C621] text-black"
                    :
                    "bg-[#003F8E] text-white"
                  }
                `}>

                  {i+1}

                </div>


                <h3 className={`
                  font-bold

                  ${
                    activeTab === "organizations"
                    ?
                    "text-white"
                    :
                    "text-[#003F8E]"
                  }

                `}>

                  {step}

                </h3>


              </div>

            ))}


          </div>



          {/* ================= CTA ================= */}


          <div className="text-center mt-14">


            <button

              onClick={() =>
                navigate(
                  activeTab === "organizations"
                  ? "/organizations"
                  : "/professionals"
                )
              }

              className="
                bg-[#F7C621]
                text-black
                px-10
                py-3
                rounded-full
                font-bold
                hover:opacity-90
                transition
              "

            >

              {activeTab === "organizations"
              ?
              "Start Hiring With Katel"
              :
              "Join Katel Talent Network"
              }


            </button>


          </div>



        </div>


      </section>


    </>

  );
}

const WhyKatel = () => {
  return (
    <section className="py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
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
              className="bg-[var(--color-primary)] text-white p-6 rounded-xl shadow-lg"
            >

              <h3 className="font-bold text-lg leading-relaxed">
                {item}
              </h3>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};




const Industries = () => {
  const [openIndustry, setOpenIndustry] = useState(null);

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
    <section className="bg-[var(--color-background)] py-20 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
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

                <span className="font-semibold text-[var(--color-primary)]">
                  {industry.title}
                </span>

                <span className="text-2xl text-[var(--color-primary)]">
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
  );
};



const TalentSolutions = () => {
  return (
    <section className="py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
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

              <h3 className="font-bold text-[var(--color-primary)] text-lg">
                {item}
              </h3>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};


const LiveStats = () => {
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

  return (
    <section className="py-20 px-6 bg-[var(--color-background)] text-center">

      <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-10">
        Building Opportunity Across Uganda
      </h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        <div>
          <h3 className="text-4xl font-bold text-[var(--color-primary)]">
            {stats.professionals}+
          </h3>
          <p className="text-gray-600">Professionals in Network</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-[var(--color-primary)]">
            {stats.organizations}+
          </h3>
          <p className="text-gray-600">Organizations Supported</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-[var(--color-primary)]">
            {stats.interviews}+
          </h3>
          <p className="text-gray-600">Interviews Coordinated</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-[var(--color-primary)]">
            {stats.roles}+
          </h3>
          <p className="text-gray-600">Roles Filled</p>
        </div>

      </div>
    </section>
  );
};


const About = () => {
  return (
    <section className="py-20 px-6 text-center">

      <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        About Katel
      </h2>

      <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
        Katel Capital connects organizations with skilled remote professionals across Uganda.
        We help businesses build dependable teams while creating meaningful career opportunities.
      </p>

    </section>
  );
};

const Impact = () => {
  return (
    <section className="py-20 px-6 bg-[var(--color-primary)] text-white">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-10">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-2 gap-8 text-left">

          <div>

            <h3 className="font-bold mb-2">
              Better Income Opportunities
            </h3>

            <p className="text-gray-200">
              Helping professionals access stable remote work.
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Supporting Business Growth
            </h3>

            <p className="text-gray-200">
              Helping organizations scale faster.
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Expanding Digital Employment
            </h3>

            <p className="text-gray-200">
              Growing Uganda’s remote workforce ecosystem.
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Empowering Young Professionals
            </h3>

            <p className="text-gray-200">
              Creating real career pathways.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};


const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-[var(--color-background)]">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
          What People Say About Katel
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Real experiences from organizations and professionals in our network.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* ORGANIZATIONS */}
          <div className="bg-white p-8 rounded-xl shadow-sm border text-left">

            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
              For Organizations
            </h3>

            <div className="space-y-6 text-gray-600">

              <div>

                <p className="italic">
                  “Katel helped us find qualified support staff much faster than traditional hiring.”
                </p>

                <p className="mt-2 font-semibold text-[var(--color-primary)]">
                  — Operations Manager
                </p>

              </div>

              <div>

                <p className="italic">
                  “We reduced our hiring time significantly and got reliable remote staff within days.”
                </p>

                <p className="mt-2 font-semibold text-[var(--color-primary)]">
                  — HR Lead, NGO Partner
                </p>

              </div>

            </div>

          </div>

          {/* PROFESSIONALS */}
          <div className="bg-white p-8 rounded-xl shadow-sm border text-left">

            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
              For Professionals
            </h3>

            <div className="space-y-6 text-gray-600">

              <div>

                <p className="italic">
                  “This opportunity helped me get my first remote job and improve my income.”
                </p>

                <p className="mt-2 font-semibold text-[var(--color-primary)]">
                  — Customer Support Agent
                </p>

              </div>

              <div>

                <p className="italic">
                  “Katel guided me through interviews and helped me become confident in remote work.”
                </p>

                <p className="mt-2 font-semibold text-[var(--color-primary)]">
                  — Virtual Assistant
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does Katel pricing work?",
      a: "Katel charges organizations a simple hourly rate based on the role, experience level, and engagement structure.",
    },
    {
      q: "What’s included in the $10/hour rate?",
      a: "This includes talent sourcing, screening, contractor onboarding, workforce support, and ongoing client coordination.",
    },
    {
      q: "Are there any setup fees?",
      a: "No. Katel operates with transparent pricing and no hidden onboarding costs.",
    },
    {
      q: "Are there long-term contracts?",
      a: "We offer flexible engagement options depending on your hiring needs.",
    },
    {
      q: "How fast can we start hiring?",
      a: "Most clients begin interviewing qualified candidates within 2–5 business days.",
    },
    {
      q: "Can Katel support scaling teams?",
      a: "Yes. Whether you need one professional or a larger remote team, Katel is built to scale with your organization.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-[#F7F7F7]">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#003F8E] mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ ITEMS */}
        <div className="space-y-4">

          {faqs.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-xl
                shadow-sm
                overflow-hidden
                transition
              "
            >

              {/* QUESTION (CLICKABLE) */}
              <button
                onClick={() => toggleFAQ(index)}
                className="
                  w-full
                  text-left
                  px-6
                  py-5
                  flex
                  justify-between
                  items-center
                  font-bold
                  text-[#003F8E]
                  hover:bg-gray-50
                  transition
                "
              >

                {item.q}

                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>

              </button>

              {/* ANSWER (TOGGLE) */}
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-7">
                  {item.a}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};


const CTA = () => {
  return (
    <section className="py-20 px-6 text-center">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] mb-6">
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
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
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
            className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            Find Work
          </button>

        </div>

      </div>
    </section>
  );
};



// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";

// export default function Home() {
//   const [openIndustry, setOpenIndustry] = useState(null);
//   const [stats, setStats] = useState({
//     professionals: 0,
//     organizations: 0,
//     interviews: 0,
//     roles: 0,
//   });

//   useEffect(() => {
//     const targets = {
//       professionals: 25,
//       organizations: 8,
//       interviews: 120,
//       roles: 35,
//     };

//     const interval = setInterval(() => {
//       setStats((prev) => {
//         const next = { ...prev };

//         if (next.professionals < targets.professionals)
//           next.professionals += 1;

//         if (next.organizations < targets.organizations)
//           next.organizations += 1;

//         if (next.interviews < targets.interviews)
//           next.interviews += 3;

//         if (next.roles < targets.roles)
//           next.roles += 1;

//         return next;
//       });
//     }, 40);

//     return () => clearInterval(interval);
//   }, []);

//   const industries = [
//     {
//       title: "Non-Governmental Organizations (NGOs)",
//       content:
//         "Program support, administration, reporting, research, communications, and donor engagement.",
//     },
//     {
//       title: "Universities & Educational Institutions",
//       content:
//         "Admissions support, student services, administration, research assistance, and digital learning support.",
//     },
//     {
//       title: "Technology & Software Companies",
//       content:
//         "Customer support, technical support, data operations, software assistance, and project coordination.",
//     },
//     {
//       title: "Financial Services",
//       content:
//         "Customer support, data entry, collections support, compliance administration, and client relationship management.",
//     },
//     {
//       title: "Healthcare Organizations",
//       content:
//         "Appointment scheduling, patient support, records management, research support, and administrative coordination.",
//     },
//     {
//       title: "E-commerce & Retail Businesses",
//       content:
//         "Customer support, order management, social media engagement, product listing, and sales support.",
//     },
//     {
//       title: "Real Estate & Property Management",
//       content:
//         "Lead management, appointment scheduling, client follow-up, marketing support, and documentation.",
//     },
//     {
//       title: "Professional Services Firms",
//       content:
//         "Administrative support, client coordination, research, bookkeeping support, and operations management.",
//     },
//     {
//       title: "Telecommunications & Customer Service",
//       content:
//         "Customer care, technical support, lead generation, retention support, and call operations.",
//     },
//     {
//       title: "Media, Marketing & Creative Agencies",
//       content:
//         "Social media management, content support, campaign coordination, design support, and client communication.",
//     },
//   ];

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />

//       {/* ================= HERO ================= */}
//       <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">

//         <img
//           src="/images/katel_capital_hero.jpg"
//           alt="Katel Capital"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         <div className="absolute inset-0 bg-[#003F8E]/75"></div>

//         <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

//           <div className="text-center text-white max-w-4xl mx-auto">

//             <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//               Unlock Talent. Build Smarter Teams
//             </h1>

//             <p className="text-lg md:text-2xl text-gray-100 leading-relaxed">
//               Helping organizations hire faster, reduce costs, and build
//               reliable remote teams while creating life-changing opportunities
//               for skilled professionals across Uganda.
//             </p>

//           </div>

//           {/* HERO CARDS */}
//           <div className="grid md:grid-cols-2 gap-8 mt-16">

//             {/* HIRE TALENT */}
//             <div className="bg-white rounded-2xl shadow-2xl p-8">

//               <h2 className="text-2xl font-bold text-[#003F8E] mb-4">
//                 Find Talent
//               </h2>

//               <p className="text-gray-600 mb-6 leading-relaxed">
//                 Get access to a wide range of pre-vetted professionals that are
//                 ready to join.
//               </p>

//               <button
//                 onClick={() =>
//                   window.open(
//                     "https://forms.gle/o7evZJqwgeCzShYp8",
//                     "_blank"
//                   )
//                 }
//                 className="bg-[#003F8E] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
//               >
//                 Hire Now
//               </button>

//             </div>

//             {/* FIND WORK */}
//             <div className="bg-white rounded-2xl shadow-2xl p-8">

//               <h2 className="text-2xl font-bold text-[#003F8E] mb-4">
//                 Find Remote Work
//               </h2>

//               <p className="text-gray-600 mb-6 leading-relaxed">
//                 Build a career without limits and connect with organizations
//                 looking for skilled professionals.
//               </p>

//               <button
//                 onClick={() =>
//                   window.open(
//                     "https://forms.gle/aLAvdJv3UQDVQL9R7",
//                     "_blank"
//                   )
//                 }
//                 className="bg-[#F7C621] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
//               >
//                 Find Job
//               </button>

//             </div>

//           </div>
//         </div>
//       </header>

//       {/* ================= HIRING CHALLENGES ================= */}
//       <section className="py-20 px-6 bg-[#F7F7F7]">

//         <div className="max-w-7xl mx-auto">

//           <div className="text-center mb-14">

//             <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
//               The Hiring Challenges Organizations Face
//             </h2>

//             <p className="text-gray-600 max-w-3xl mx-auto">
//               As organizations grow, hiring and workforce management become
//               more complex. Katel helps businesses overcome these challenges
//               with reliable remote workforce solutions.
//             </p>

//           </div>

//           <div className="grid md:grid-cols-2 gap-8">

//             {[
//               {
//                 title: "Rising Hiring & Staffing Costs",
//                 text: "Reduce overhead expenses through flexible remote workforce solutions.",
//               },
//               {
//                 title: "Difficulty Finding Qualified Talent",
//                 text: "Access carefully screened professionals ready for remote work.",
//               },
//               {
//                 title: "Slow Recruitment Processes",
//                 text: "Interview qualified candidates within days instead of months.",
//               },
//               {
//                 title: "High Employee Turnover",
//                 text: "Improve long-term retention through better role matching and support.",
//               },
//               {
//                 title: "Internal HR Burden",
//                 text: "Katel handles sourcing, screening, and workforce coordination.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-6 rounded-xl shadow-sm border"
//               >
//                 <h3 className="text-xl font-bold text-[#003F8E] mb-3">
//                   {item.title}
//                 </h3>

//                 <p className="text-gray-600 leading-relaxed">
//                   {item.text}
//                 </p>
//               </div>
//             ))}

//           </div>

//         </div>
//       </section>

//       {/* ================= WHY KATEL ================= */}
//       <section className="py-20 px-6">

//         <div className="max-w-7xl mx-auto">

//           <div className="text-center mb-14">

//             <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
//               Why Organizations Choose Katel
//             </h2>

//             <p className="text-gray-600 max-w-3xl mx-auto">
//               With Katel, organizations reduce costs, save time, and build
//               dependable teams that support growth.
//             </p>

//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

//             {[
//               "Reduce Hiring Costs",
//               "Save Valuable Time",
//               "Access Carefully Vetted Talent",
//               "Flexible Support & Ongoing Partnership",
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-[#003F8E] text-white p-6 rounded-xl shadow-lg"
//               >
//                 <h3 className="font-bold text-lg leading-relaxed">
//                   {item}
//                 </h3>
//               </div>
//             ))}

//           </div>

//         </div>
//       </section>

//       {/* ================= INDUSTRIES ================= */}
//       <section className="bg-[#F7F7F7] py-20 px-6">

//         <div className="max-w-6xl mx-auto">

//           <div className="text-center mb-12">

//             <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
//               Industries We Support
//             </h2>

//             <p className="text-gray-600">
//               Katel provides remote workforce solutions across key sectors
//               driving growth in Uganda.
//             </p>

//           </div>

//           <div className="space-y-4">

//             {industries.map((industry, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl border shadow-sm overflow-hidden"
//               >

//                 <button
//                   onClick={() =>
//                     setOpenIndustry(
//                       openIndustry === index ? null : index
//                     )
//                   }
//                   className="w-full text-left p-5 flex justify-between items-center"
//                 >

//                   <span className="font-semibold text-[#003F8E]">
//                     {industry.title}
//                   </span>

//                   <span className="text-2xl text-[#003F8E]">
//                     {openIndustry === index ? "−" : "+"}
//                   </span>

//                 </button>

//                 {openIndustry === index && (
//                   <div className="px-5 pb-5 text-gray-600 leading-relaxed">
//                     {industry.content}
//                   </div>
//                 )}

//               </div>
//             ))}

//           </div>

//         </div>
//       </section>

//       {/* ================= TALENT SOLUTIONS ================= */}
//       <section className="py-20 px-6">

//         <div className="max-w-7xl mx-auto">

//           <div className="text-center mb-14">

//             <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
//               Our Talent Solutions
//             </h2>

//             <p className="text-gray-600 max-w-3xl mx-auto">
//               Katel connects organizations with skilled remote professionals
//               who support operations, customer experience, growth, and business
//               performance.
//             </p>

//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {[
//               "Customer Support",
//               "Administrative Support",
//               "Virtual Assistance",
//               "Data Management",
//               "Research Assistance",
//               "Technical Support",
//               "Sales & Customer Engagement",
//               "Social Media & Digital Marketing",
//               "Finance & Operations Support",
//               "Project & Program Support",
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
//               >
//                 <h3 className="font-bold text-[#003F8E] text-lg">
//                   {item}
//                 </h3>
//               </div>
//             ))}

//           </div>

//         </div>
//       </section>

//       {/* ================= HOW IT WORKS ORGS ================= */}
//       <section className="bg-[#003F8E] py-20 px-6 text-white">

//         <div className="max-w-7xl mx-auto">

//           <div className="text-center mb-16">

//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               How Katel Works for Organizations
//             </h2>

//             <p className="text-gray-200">
//               Simple hiring. Qualified talent. Long-term support.
//             </p>

//           </div>

//           <div className="grid md:grid-cols-5 gap-6">

//             {[
//               "Share Your Hiring Needs",
//               "Talent Matching",
//               "Candidate Interviews",
//               "Fast Onboarding",
//               "Ongoing Support",
//             ].map((step, i) => (
//               <div
//                 key={i}
//                 className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
//               >

//                 <div className="w-12 h-12 rounded-full bg-[#F7C621] text-black font-bold flex items-center justify-center mx-auto mb-4">
//                   {i + 1}
//                 </div>

//                 <h3 className="font-bold">
//                   {step}
//                 </h3>

//               </div>
//             ))}

//           </div>

//         </div>
//       </section>

//       {/* ================= HOW IT WORKS PROFESSIONALS ================= */}
//       <section className="py-20 px-6 bg-[#F7F7F7]">

//         <div className="max-w-7xl mx-auto">

//           <div className="text-center mb-16">

//             <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
//               How Katel Works for Professionals
//             </h2>

//             <p className="text-gray-600">
//               Build your career. Work remotely. Grow with confidence.
//             </p>

//           </div>

//           <div className="grid md:grid-cols-5 gap-6">

//             {[
//               "Apply",
//               "Screening & Assessment",
//               "Interview Preparation",
//               "Client Matching",
//               "Start Working & Grow",
//             ].map((step, i) => (
//               <div
//                 key={i}
//                 className="bg-white border rounded-xl p-6 shadow-sm text-center"
//               >

//                 <div className="w-12 h-12 rounded-full bg-[#003F8E] text-white font-bold flex items-center justify-center mx-auto mb-4">
//                   {i + 1}
//                 </div>

//                 <h3 className="font-bold text-[#003F8E]">
//                   {step}
//                 </h3>

//               </div>
//             ))}

//           </div>

//         </div>
//       </section>

//             {/* ================= LIVE STATS ================= */}
//       <section className="py-20 px-6 bg-[#F7F7F7] text-center">

//         <h2 className="text-3xl font-bold text-[#003F8E] mb-10">
//           Building Opportunity Across Uganda
//         </h2>

//         <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

//           <div>
//             <h3 className="text-4xl font-bold text-[#003F8E]">{stats.professionals}+</h3>
//             <p className="text-gray-600">Professionals in Network</p>
//           </div>

//           <div>
//             <h3 className="text-4xl font-bold text-[#003F8E]">{stats.organizations}+</h3>
//             <p className="text-gray-600">Organizations Supported</p>
//           </div>

//           <div>
//             <h3 className="text-4xl font-bold text-[#003F8E]">{stats.interviews}+</h3>
//             <p className="text-gray-600">Interviews Coordinated</p>
//           </div>

//           <div>
//             <h3 className="text-4xl font-bold text-[#003F8E]">{stats.roles}+</h3>
//             <p className="text-gray-600">Roles Filled</p>
//           </div>

//         </div>
//       </section>

//       {/* ================= ABOUT SHORT ================= */}
//       <section className="py-20 px-6 text-center">

//         <h2 className="text-3xl font-bold text-[#003F8E] mb-4">
//           About Katel
//         </h2>

//         <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
//           Katel Capital connects organizations with skilled remote professionals across Uganda.
//           We help businesses build dependable teams while creating meaningful career opportunities.
//         </p>

//       </section>

//       {/* ================= IMPACT ================= */}
//       <section className="py-20 px-6 bg-[#003F8E] text-white">

//         <div className="max-w-6xl mx-auto text-center">

//           <h2 className="text-3xl font-bold mb-10">Our Impact</h2>

//           <div className="grid md:grid-cols-2 gap-8 text-left">

//             <div>
//               <h3 className="font-bold mb-2">Better Income Opportunities</h3>
//               <p className="text-gray-200">Helping professionals access stable remote work.</p>
//             </div>

//             <div>
//               <h3 className="font-bold mb-2">Supporting Business Growth</h3>
//               <p className="text-gray-200">Helping organizations scale faster.</p>
//             </div>

//             <div>
//               <h3 className="font-bold mb-2">Expanding Digital Employment</h3>
//               <p className="text-gray-200">Growing Uganda’s remote workforce ecosystem.</p>
//             </div>

//             <div>
//               <h3 className="font-bold mb-2">Empowering Young Professionals</h3>
//               <p className="text-gray-200">Creating real career pathways.</p>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* ================= TESTIMONIALS ================= */}
// <section className="py-20 px-6 bg-[#F7F7F7]">

//   <div className="max-w-7xl mx-auto text-center">

//     <h2 className="text-3xl md:text-4xl font-bold text-[#003F8E] mb-4">
//       What People Say About Katel
//     </h2>

//     <p className="text-gray-600 max-w-3xl mx-auto mb-12">
//       Real experiences from organizations and professionals in our network.
//     </p>

//     {/* GRID */}
//     <div className="grid md:grid-cols-2 gap-8">

//       {/* ORGANIZATIONS */}
//       <div className="bg-white p-8 rounded-xl shadow-sm border text-left">

//         <h3 className="text-xl font-bold text-[#003F8E] mb-4">
//           For Organizations
//         </h3>

//         <div className="space-y-6 text-gray-600">

//           <div>
//             <p className="italic">
//               “Katel helped us find qualified support staff much faster than traditional hiring.”
//             </p>
//             <p className="mt-2 font-semibold text-[#003F8E]">
//               — Operations Manager
//             </p>
//           </div>

//           <div>
//             <p className="italic">
//               “We reduced our hiring time significantly and got reliable remote staff within days.”
//             </p>
//             <p className="mt-2 font-semibold text-[#003F8E]">
//               — HR Lead, NGO Partner
//             </p>
//           </div>

//         </div>

//       </div>

//       {/* PROFESSIONALS */}
//       <div className="bg-white p-8 rounded-xl shadow-sm border text-left">

//         <h3 className="text-xl font-bold text-[#003F8E] mb-4">
//           For Professionals
//         </h3>

//         <div className="space-y-6 text-gray-600">

//           <div>
//             <p className="italic">
//               “This opportunity helped me get my first remote job and improve my income.”
//             </p>
//             <p className="mt-2 font-semibold text-[#003F8E]">
//               — Customer Support Agent
//             </p>
//           </div>

//           <div>
//             <p className="italic">
//               “Katel guided me through interviews and helped me become confident in remote work.”
//             </p>
//             <p className="mt-2 font-semibold text-[#003F8E]">
//               — Virtual Assistant
//             </p>
//           </div>

//         </div>

//       </div>

//     </div>

//   </div>
// </section>
//       {/* ================= FINAL CTA ================= */}
//       <section className="py-20 px-6 text-center">

//         <div className="max-w-4xl mx-auto">

//           <h2 className="text-3xl md:text-5xl font-bold text-[#003F8E] mb-6">
//             Build Reliable Teams With Confidence
//           </h2>

//           <p className="text-gray-600 text-lg leading-relaxed mb-10">
//             Whether you are hiring remote professionals or searching for new
//             career opportunities, Katel Capital is ready to help you grow.
//           </p>

//           <div className="flex flex-col md:flex-row justify-center gap-4">

//             <button
//               onClick={() =>
//                 window.open(
//                   "https://forms.gle/o7evZJqwgeCzShYp8",
//                   "_blank"
//                 )
//               }
//               className="bg-[#003F8E] text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
//             >
//               Start Hiring
//             </button>

//             <button
//               onClick={() =>
//                 window.open(
//                   "https://forms.gle/aLAvdJv3UQDVQL9R7",
//                   "_blank"
//                 )
//               }
//               className="border-2 border-[#003F8E] text-[#003F8E] px-8 py-4 rounded-xl font-semibold hover:bg-[#003F8E] hover:text-white transition"
//             >
//               Find Work
//             </button>

//           </div>

//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }