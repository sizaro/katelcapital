import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AcademyShell from "./AcademyShell";
import { academyError, INITIATE_MOBILE_MONEY } from "./academyFlow";

export default function AcademyMobileMoney() {
  const navigate = useNavigate(); const [params] = useSearchParams(); const applicantId = params.get("application");
  const [provider, setProvider] = useState("MTN_MOMO"); const [phone, setPhone] = useState(""); const [error, setError] = useState("");
  const [initiate, { loading }] = useMutation(INITIATE_MOBILE_MONEY);
  const submit = async (event) => { event.preventDefault(); if (!applicantId) return setError("Your verified Academy application could not be found. Return to payment and try again."); try { setError(""); const { data } = await initiate({ variables: { input: { applicantId, provider, phone: phone.trim() } } }); navigate(`/academy/payment/mobile-money/processing?payment=${data.initiateAcademyMobileMoneyPayment.id}`); } catch (err) { setError(academyError(err)); } };
  return <AcademyShell title="Mobile Money payment" description="The payment request is linked to your verified Academy application. Your portal is created only after confirmation."><form onSubmit={submit} className="mx-auto max-w-xl rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-200"><div className="grid grid-cols-2 gap-3"><button type="button" onClick={()=>setProvider("MTN_MOMO")} className={`rounded-xl border-2 p-4 font-bold ${provider === "MTN_MOMO" ? "border-[#003F8E] bg-blue-50 text-[#003F8E]" : "border-slate-200"}`}>MTN MoMo</button><button type="button" onClick={()=>setProvider("AIRTEL_MONEY")} className={`rounded-xl border-2 p-4 font-bold ${provider === "AIRTEL_MONEY" ? "border-[#003F8E] bg-blue-50 text-[#003F8E]" : "border-slate-200"}`}>Airtel Money</button></div><label className="mt-6 block text-sm font-semibold text-slate-700">Mobile Money number<input required minLength="10" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+256…" className="mt-2 w-full rounded-xl border px-4 py-3" /></label>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-[#003F8E] py-3.5 font-bold text-white disabled:opacity-50">{loading ? "Requesting payment…" : "Request payment"}</button></form></AcademyShell>;
}
