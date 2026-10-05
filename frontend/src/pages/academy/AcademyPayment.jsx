import React, { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AcademyShell from "./AcademyShell";
import { money } from "./academyFlow";

export default function AcademyPayment() {
  const navigate = useNavigate(); const [params] = useSearchParams();
  const application = useMemo(() => { try { return JSON.parse(sessionStorage.getItem("katelAcademyApplication") || "null"); } catch { return null; } }, []);
  const applicantId = params.get("application") || application?.id || application?.applicantId;
  if (!applicantId || !application?.emailVerifiedAt) return <AcademyShell title="Payment unavailable"><div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl">Verify your email before continuing to payment.</div></AcademyShell>;
  return <AcademyShell title="Academy payment" description="The fee is set by authorized Academy administrators. Your portal account is created only after payment confirmation."><div className="mx-auto max-w-2xl rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-200"><div className="rounded-2xl bg-blue-50 p-5"><p className="text-sm font-semibold text-slate-600">Applicable Academy fee</p><p className="mt-1 text-3xl font-bold text-[#003F8E]">{money(application.fee?.amount, application.fee?.currency)}</p><p className="mt-2 text-sm text-slate-600">{application.fee?.category?.replaceAll("_", " ").toLowerCase()}</p></div><button onClick={() => navigate(`/academy/payment/mobile-money?application=${applicantId}`)} className="mt-6 w-full rounded-xl bg-[#003F8E] px-5 py-4 font-bold text-white">Pay with MTN or Airtel Mobile Money</button><p className="mt-4 text-center text-xs leading-5 text-slate-500">Selecting a payment method does not enroll you. Access begins only when the backend confirms the payment.</p></div></AcademyShell>;
}
