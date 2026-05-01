import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Jobs() {
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    keyword: "",
  });

  // ================= MOCKED JOBS =================
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: "House Plumbing Repair",
        category: "Plumbing",
        location: "Kampala",
        budget: "50 - 100 USD",
        description: "Fix leaking pipes in a 3-bedroom house.",
      },
      {
        id: 2,
        title: "Electrical Wiring Installation",
        category: "Electrician",
        location: "Mukono",
        budget: "120 USD",
        description: "Install wiring for new apartment building.",
      },
      {
        id: 3,
        title: "House Cleaning Service",
        category: "Cleaning",
        location: "Kampala",
        budget: "30 USD",
        description: "Deep cleaning for 2-bedroom apartment.",
      },
      {
        id: 4,
        title: "Wood Furniture Making",
        category: "Carpentry",
        location: "Entebbe",
        budget: "200 USD",
        description: "Build custom kitchen cabinets.",
      },
      {
        id: 5,
        title: "Math Tutor Needed",
        category: "Tutoring",
        location: "Online",
        budget: "15 USD/hr",
        description: "Teach high school mathematics.",
      },
    ];

    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  // ================= HANDLE SEARCH FROM NAVBAR =================
  useEffect(() => {
    if (location.state?.results) {
      setJobs(location.state.results);
      setFilteredJobs(location.state.results);
    }
  }, [location.state]);

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let data = [...jobs];

    if (filters.category) {
      data = data.filter((job) =>
        job.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.location) {
      data = data.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.keyword) {
      data = data.filter((job) =>
        job.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    setFilteredJobs(data);
  }, [filters, jobs]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Find Jobs
        </h1>
        <p className="text-gray-600">
          Browse available work opportunities
        </p>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 mb-8">
        
        <input
          type="text"
          placeholder="Search job title..."
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, keyword: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category (e.g Plumbing)"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
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

      {/* ================= JOB LIST ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
            >
              <h2 className="text-xl font-bold text-blue-700">
                {job.title}
              </h2>

              <p className="text-gray-600 mt-1">
                {job.description}
              </p>

              <div className="mt-3 text-sm text-gray-500">
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Budget:</strong> {job.budget}</p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}