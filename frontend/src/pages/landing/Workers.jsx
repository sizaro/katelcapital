// src/pages/landing/Workers.jsx
import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useData } from "../../context/DataContext";

export default function Workers() {
  const { workers = [], fetchWorkers } = useData();

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />

      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Our Talent Pool</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Browse skilled professionals ready for your next project.
        </p>
      </header>

      <main className="flex-1 px-6 py-16 max-w-7xl mx-auto">
        {workers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-center"
              >
                <img
                  src={worker.photo_url || "/images/default_worker.webp"}
                  alt={worker.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{worker.name}</h3>
                <p className="text-gray-600">{worker.skill || "Unknown Skill"}</p>
                <p className="text-gray-800 font-medium mt-1">
                  Experience: {worker.experience || "N/A"} yrs
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No workers available yet.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
