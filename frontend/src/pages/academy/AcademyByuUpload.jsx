import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyByuUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select your BYU-Pathway proof document.");
      return;
    }

    const stored = sessionStorage.getItem("katelAcademyApplication");

    if (!stored) {
      navigate("/academy/register", { replace: true });
      return;
    }

    const application = JSON.parse(stored);

    sessionStorage.setItem(
      "katelAcademyApplication",
      JSON.stringify({
        ...application,
        byuDocumentUploaded: true,
        byuDocumentName: file.name,
        byuReviewStatus: "PENDING",
      }),
    );

    navigate("/academy/byu-review");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="bg-[#003F8E] px-6 py-16 text-white md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F7C621]">
              Katel Academy
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">
              Submit your BYU-Pathway proof
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Upload a document that can be used to review your BYU-Pathway
              graduate status.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
            >
              <h2 className="text-2xl font-bold text-[#003F8E]">
                Upload document
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                For development, selecting any document is enough to simulate
                the upload.
              </p>

              <input
                type="file"
                onChange={(event) => {
                  setFile(event.target.files?.[0] || null);
                  setError("");
                }}
                className="mt-8 block w-full rounded-xl border border-gray-300 p-3"
              />

              {file && (
                <p className="mt-3 text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#003F8E] px-8 py-3.5 font-bold text-white transition hover:opacity-90"
              >
                Submit for Review
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
