import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AcademyShell({ eyebrow = "Katel Academy", title, description, children }) {
  return <div className="min-h-screen bg-slate-50"><Navbar />
    <section className="bg-[#003F8E] px-6 py-14 text-white md:py-18"><div className="mx-auto max-w-5xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[.2em] text-[#F7C621]">{eyebrow}</p>
      <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">{description}</p>}
    </div></section>
    <main className="px-5 py-12 md:px-6 md:py-16"><div className="mx-auto max-w-5xl">{children}</div></main>
    <Footer />
  </div>;
}
