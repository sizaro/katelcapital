// src/pages/landing/Jobs.jsx
import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useData } from "../../context/DataContext";

export default function Jobs() {
  const { jobListings = [], fetchJobListings } = useData();

  useEffect(() => {
    fetchJobListings();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />

      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Available Jobs</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Explore current opportunities and find the right job for your skills.
        </p>
      </header>

      <main className="flex-1 px-6 py-16 max-w-7xl mx-auto">
        {jobListings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-800 font-medium">
                  Location: {job.location}
                </p>
                <p className="text-gray-600 mt-2">{job.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No job opportunities found.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
