import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AcademyShell from "./AcademyShell";

export default function AcademyPaymentSuccess() {
  const navigate = useNavigate(); const [params] = useSearchParams();
  return <AcademyShell title="Payment confirmed" description="Your secure Academy account-activation link has been sent to your verified email."><div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div><h2 className="mt-6 text-2xl font-bold text-slate-900">Check your email</h2><p className="mt-3 text-slate-600">Open the activation link, enter your first name, last name, and password, then your Academy portal will be ready.</p><button onClick={()=>navigate("/academy")} className="mt-7 w-full rounded-xl bg-[#003F8E] py-3.5 font-bold text-white">Return to Academy</button></div></AcademyShell>;
}
