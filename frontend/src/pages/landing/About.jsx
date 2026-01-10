import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useData } from "../../context/DataContext";
import { motion } from "framer-motion";

export default function About() {
  const { users = [], fetchUsers } = useData();

  // Base URL for user images (kept compatible with your setup)
  const staticBaseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5500"
      : "https://salonmanagementsystemv2-ru0i.onrender.com/";

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= ROLE MAPPING ================= */
  const admin = users.find((u) => u.role === "admin") || {};
  const employers = users.filter((u) => u.role === "employer");
  const workers = users.filter((u) => u.role === "worker");

  const fullName = (user) => user?.name || user?.last_name || "Katel Team";

  const getImage = (user, fallback) => {
    if (!user?.image_url || user.image_url === "-") return fallback;
    return `${staticBaseUrl}${user.image_url}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 text-center">
        <h1 className="md:text-5xl text-2xl font-bold mb-4">
          About Katel Capital Ltd
        </h1>
        <p className="max-w-3xl mx-auto text-lg">
          Connecting Ugandan talent to real opportunities — empowering workers,
          supporting employers, and enabling transparent contracts.
        </p>
      </header>

      <main className="flex-1 px-6 py-16 max-w-6xl mx-auto space-y-20">
        {/* ================= FOUNDER / ADMIN ================= */}
        {admin?.id && (
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src={getImage(admin, "/images/default_admin.webp")}
              alt={fullName(admin)}
              className="rounded-xl shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {fullName(admin)}
              </h2>
              <p className="text-blue-600 font-medium mb-4">
                Founder & Platform Director
              </p>
              <p className="text-gray-700 leading-relaxed">
                {admin.bio ||
                  "Katel Capital Ltd was founded to bridge the gap between skilled Ugandan workers and employers seeking reliable talent. The platform is built to support fair hiring, clear communication, and secure contract management."}
              </p>
            </div>
          </section>
        )}

        {/* ================= OUR STORY ================= */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
            Katel Capital Ltd was established to solve a real challenge in the
            Ugandan job market — connecting capable local talent with employers
            who need trusted, verified workers. Too often, opportunities and
            skills fail to meet.
          </p>
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our platform provides a structured way for employers to post jobs,
            workers to apply and showcase their skills, and both parties to
            engage through clear communication and optional contract brokerage
            managed by the platform.
          </p>
        </section>

        {/* ================= EMPLOYER PARTNERS ================= */}
        {employers.length > 0 && (
          <section className="space-y-10">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Our Employer Partners
            </h2>

            {employers.map((emp) => (
              <div
                key={emp.id}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {fullName(emp)}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    Employer / Contractor
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {emp.bio ||
                      "Employers on Katel Capital gain access to vetted local talent, efficient hiring workflows, and structured contract support."}
                  </p>
                </div>
                <img
                  src={getImage(emp, "/images/default_employer.webp")}
                  alt={fullName(emp)}
                  className="rounded-xl shadow-lg w-full object-cover"
                />
              </div>
            ))}
          </section>
        )}

        {/* ================= WORKERS / TALENT ================= */}
        {workers.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Meet Our Talent
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {workers.map((worker, index) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white shadow-md rounded-xl overflow-hidden"
                >
                  <img
                    src={getImage(worker, "/images/default_worker.webp")}
                    alt={fullName(worker)}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {fullName(worker)}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {worker.specialty || "Skilled Professional"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
}
