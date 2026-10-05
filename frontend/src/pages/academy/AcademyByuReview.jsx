import React from "react";
import { Link } from "react-router-dom";
import AcademyShell from "./AcademyShell";

export default function AcademyByuReview() {
  return <AcademyShell title="BYU Pathway proof submitted" description="An authorized Academy reviewer will check the proof. This request does not create a registration, payment, or enrollment until it is approved."><div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-2xl">⌛</div><h2 className="mt-5 text-xl font-bold text-slate-900">Awaiting review</h2><p className="mt-3 leading-7 text-slate-600">The decision and, if approved, a one-time continuation link will be sent to your verified email.</p><Link to="/academy" className="mt-7 inline-block rounded-xl bg-[#003F8E] px-6 py-3 font-bold text-white">Return to Academy</Link></div></AcademyShell>;
}
