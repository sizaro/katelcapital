import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AcademyShell from "./AcademyShell";
import { academyError, CONFIRM_MOCK_PAYMENT } from "./academyFlow";

export default function AcademyPaymentProcessing() {
  const navigate = useNavigate(); const [params] = useSearchParams(); const paymentId = params.get("payment"); const [error, setError] = useState("");
  const [confirm, { loading }] = useMutation(CONFIRM_MOCK_PAYMENT);
  const complete = async () => { if (!paymentId) return setError("Payment reference is missing."); try { setError(""); await confirm({ variables: { paymentId } }); sessionStorage.removeItem("katelAcademyApplication"); navigate("/academy/payment/success", { replace: true }); } catch (err) { setError(academyError(err)); } };
  return <AcademyShell title="Confirming payment" description="The only mocked service is Mobile Money. Once payment is confirmed, your account activation link is sent to the verified email."><div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200"><div className="mx-auto h-12 w-12 rounded-full border-4 border-slate-200 border-t-[#003F8E]" /><h2 className="mt-6 text-xl font-bold text-slate-900">Payment request created</h2><p className="mt-3 leading-7 text-slate-600">No portal account exists yet. Confirming payment sends the secure email link where you set your name and password to open your course portal.</p>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-left text-sm text-red-700">{error}</p>}<button onClick={complete} disabled={loading} className="mt-7 w-full rounded-xl bg-[#003F8E] py-3.5 font-bold text-white disabled:opacity-50">{loading ? "Confirming…" : "Confirm mock Mobile Money payment"}</button></div></AcademyShell>;
}
