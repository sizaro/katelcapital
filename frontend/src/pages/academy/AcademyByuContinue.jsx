import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AcademyShell from "./AcademyShell";
import { academyError, COMPLETE_BYU } from "./academyFlow";

export default function AcademyByuContinue() {
  const navigate = useNavigate(); const [params] = useSearchParams(); const token = params.get("token") || ""; const [error, setError] = useState("");
  const [complete, { loading }] = useMutation(COMPLETE_BYU);
  useEffect(() => { if (!token) setError("This approval link is missing or invalid."); }, [token]);
  const continueToPayment = async () => { try { setError(""); const { data } = await complete({ variables: { input: { continuationToken: token } } }); const application = data.completeByuPathwayContinuation; sessionStorage.setItem("katelAcademyApplication", JSON.stringify(application)); navigate(`/academy/payment?application=${application.id}`); } catch (err) { setError(academyError(err)); } };
  return <AcademyShell title="Your BYU fee is approved" description="Your reduced Academy fee has been applied. Continue to payment; your learner account is created only after payment and email activation."><div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div><h2 className="mt-5 text-xl font-bold text-slate-900">Continue to payment</h2>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-left text-sm text-red-700">{error}</p>}<button disabled={loading || !token} onClick={continueToPayment} className="mt-7 w-full rounded-xl bg-[#003F8E] py-3.5 font-bold text-white disabled:opacity-50">{loading ? "Preparing payment…" : "Continue to reduced-fee payment"}</button></div></AcademyShell>;
}
