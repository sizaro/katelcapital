import React, { useMemo, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import AcademyShell from "./AcademyShell";
import { academyError, START_BYU_PROOF, VERIFY_LEARNER_EMAIL } from "./academyFlow";

export default function AcademyVerifyEmail() {
  const navigate = useNavigate();
  const account = useMemo(() => { try { return JSON.parse(sessionStorage.getItem("katelAcademyApplication") || "null"); } catch { return null; } }, []);
  const [code, setCode] = useState(""); const [error, setError] = useState("");
  const [verify, { loading }] = useMutation(VERIFY_LEARNER_EMAIL); const [startByu] = useMutation(START_BYU_PROOF);
  const submit = async (event) => {
    event.preventDefault(); if (!account) return navigate("/academy", { replace: true });
    try { setError(""); const { data } = await verify({ variables: { input: { applicantId: account.applicantId, code } } }); const application = { ...account, ...data.verifyAcademyLearnerEmail }; sessionStorage.setItem("katelAcademyApplication", JSON.stringify(application)); if (account.isByu) { const proof = await startByu({ variables: { input: { applicantId: application.id } } }); sessionStorage.setItem("katelByuProofGrant", JSON.stringify({ ...proof.data.startByuPathwayProof, courseId: application.courseId, email: application.email })); navigate("/academy/byu-upload"); return; } navigate(`/academy/payment?application=${application.id}`); }
    catch (err) { setError(academyError(err, "The verification code is invalid or has expired.")); }
  };
  return <AcademyShell title="Verify your email" description="Use the one-time code sent to your email. Payment starts only after this step; no portal account exists yet."><div className="mx-auto max-w-xl rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-200"><p className="text-center text-slate-600">Code sent to <strong>{account?.email || "your email"}</strong>.</p><form onSubmit={submit} className="mt-7 space-y-5"><input required autoFocus inputMode="numeric" maxLength="6" value={code} onChange={(e)=>setCode(e.target.value.replace(/\D/g,""))} className="w-full rounded-xl border px-4 py-4 text-center text-2xl tracking-[.45em]" placeholder="000000" />{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={loading} className="w-full rounded-xl bg-[#003F8E] py-3.5 font-bold text-white disabled:opacity-50">{loading ? "Verifying…" : "Verify email and continue to payment"}</button></form></div></AcademyShell>;
}
