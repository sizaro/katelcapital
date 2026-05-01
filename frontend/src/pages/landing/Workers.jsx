import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Workers() {
  const location = useLocation();

  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const [filters, setFilters] = useState({
    skill: "",
    location: "",
    keyword: "",
  });

  // ================= MOCKED WORKERS =================
  useEffect(() => {
    const mockWorkers = [
      {
        id: 1,
        name: "John Kamau",
        skill: "Plumber",
        location: "Kampala",
        rate: "$10/hr",
        rating: 4.5,
        bio: "Experienced plumber with 5+ years in residential work.",
      },
      {
        id: 2,
        name: "Sarah Nanyonga",
        skill: "Electrician",
        location: "Mukono",
        rate: "$15/hr",
        rating: 4.8,
        bio: "Certified electrician handling industrial installations.",
      },
      {
        id: 3,
        name: "David Okello",
        skill: "Cleaner",
        location: "Entebbe",
        rate: "$5/hr",
        rating: 4.2,
        bio: "Reliable home and office cleaning specialist.",
      },
      {
        id: 4,
        name: "Mary Achieng",
        skill: "Tutor",
        location: "Online",
        rate: "$8/hr",
        rating: 4.9,
        bio: "Math and science tutor for high school students.",
      },
      {
        id: 5,
        name: "Brian Ssebuggwawo",
        skill: "Carpenter",
        location: "Kampala",
        rate: "$12/hr",
        rating: 4.6,
        bio: "Custom furniture and woodwork specialist.",
      },
    ];

    setWorkers(mockWorkers);
    setFilteredWorkers(mockWorkers);
  }, []);

  // ================= HANDLE SEARCH FROM NAVBAR =================
  useEffect(() => {
    if (location.state?.results) {
      setWorkers(location.state.results);
      setFilteredWorkers(location.state.results);
    }
  }, [location.state]);

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let data = [...workers];

    if (filters.skill) {
      data = data.filter((w) =>
        w.skill.toLowerCase().includes(filters.skill.toLowerCase())
      );
    }

    if (filters.location) {
      data = data.filter((w) =>
        w.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.keyword) {
      data = data.filter((w) =>
        w.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    setFilteredWorkers(data);
  }, [filters, workers]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Hire Talent
        </h1>
        <p className="text-gray-600">
          Browse skilled workers available for hire
        </p>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search name..."
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, keyword: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Skill (e.g Electrician)"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, skill: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        />
      </div>

      {/* ================= WORKER LIST ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredWorkers.length === 0 ? (
          <p className="text-gray-500">No workers found.</p>
        ) : (
          filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
            >

              {/* Avatar placeholder */}
              <div className="w-14 h-14 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full font-bold text-lg mb-3">
                {worker.name.charAt(0)}
              </div>

              <h2 className="text-xl font-bold text-blue-700">
                {worker.name}
              </h2>

              <p className="text-gray-600 mt-1">{worker.bio}</p>

              <div className="mt-3 text-sm text-gray-500">
                <p><strong>Skill:</strong> {worker.skill}</p>
                <p><strong>Location:</strong> {worker.location}</p>
                <p><strong>Rate:</strong> {worker.rate}</p>
                <p><strong>Rating:</strong> ⭐ {worker.rating}</p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}