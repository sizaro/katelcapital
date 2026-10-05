import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Building2, GraduationCap, RefreshCw, Users } from 'lucide-react';

type Section = 'professionals' | 'clients' | 'readiness';

const PROFESSIONALS = gql`
  query AdminProfessionals { adminProfessionals { id code name email status completionPercent category location } }
`;
const CLIENTS = gql`
  query AdminClients { adminClients { id code name industry country status contacts requests } }
`;
const READINESS = gql`
  query AdminReadiness { adminReadiness { id learnerName learnerEmail courseTitle enrollmentStatus status score reviewedBy reviewedAt } }
`;

const headings: Record<Section, { title: string; description: string; icon: typeof Users }> = {
  professionals: { title: 'Professionals', description: 'A platform-wide view of every professional profile, its completion state, and its current journey status.', icon: Users },
  clients: { title: 'Client organizations', description: 'Organizations, their contact coverage, and active hiring-request footprint across the platform.', icon: Building2 },
  readiness: { title: 'Academy readiness', description: 'Academy learners and review outcomes on the path toward professional readiness.', icon: GraduationCap },
};

function Empty({ label }: { label: string }) {
  return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No {label.toLowerCase()} records exist yet. New records will appear here automatically as the platform is used.</div>;
}

export default function AdminRecords({ section }: { section: Section }) {
  const definition = headings[section];
  const query = section === 'professionals' ? PROFESSIONALS : section === 'clients' ? CLIENTS : READINESS;
  const { data, loading, error, refetch } = useQuery(query, { fetchPolicy: 'cache-and-network' });
  const rows = section === 'professionals' ? data?.adminProfessionals ?? [] : section === 'clients' ? data?.adminClients ?? [] : data?.adminReadiness ?? [];
  const Icon = definition.icon;

  return <section className="mt-8">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex gap-3"><span className="rounded-2xl bg-blue-50 p-3 text-[#003F8E]"><Icon size={24} /></span><div><h2 className="text-2xl font-bold text-slate-900">{definition.title}</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{definition.description}</p></div></div>
      <button type="button" onClick={() => void refetch()} className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RefreshCw size={16} /> Refresh</button>
    </div>
    {loading && !data ? <div className="h-64 animate-pulse rounded-3xl bg-slate-200" /> : error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">This platform view could not be loaded. {error.message}</div> : !rows.length ? <Empty label={definition.title} /> : (
      <div className="overflow-x-auto rounded-3xl border bg-white shadow-sm"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{section === 'professionals' ? <><th className="px-5 py-3">Professional</th><th className="px-5 py-3">Category / location</th><th className="px-5 py-3">Profile completion</th><th className="px-5 py-3">Status</th></> : section === 'clients' ? <><th className="px-5 py-3">Organization</th><th className="px-5 py-3">Industry / country</th><th className="px-5 py-3">Contacts</th><th className="px-5 py-3">Requests</th><th className="px-5 py-3">Status</th></> : <><th className="px-5 py-3">Learner</th><th className="px-5 py-3">Course</th><th className="px-5 py-3">Enrollment</th><th className="px-5 py-3">Readiness</th><th className="px-5 py-3">Review</th></>}</tr></thead><tbody className="divide-y">{rows.map((row: any) => section === 'professionals' ? <tr key={row.id} className="hover:bg-blue-50/40"><td className="px-5 py-4"><strong>{row.name}</strong><p className="text-xs text-slate-500">{row.code} · {row.email}</p></td><td className="px-5 py-4">{row.category || '—'}<p className="text-xs text-slate-500">{row.location || 'Location not set'}</p></td><td className="px-5 py-4">{row.completionPercent}%</td><td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#003F8E]">{row.status.replaceAll('_', ' ')}</span></td></tr> : section === 'clients' ? <tr key={row.id} className="hover:bg-blue-50/40"><td className="px-5 py-4"><strong>{row.name}</strong><p className="text-xs text-slate-500">{row.code}</p></td><td className="px-5 py-4">{row.industry || '—'}<p className="text-xs text-slate-500">{row.country || 'Country not set'}</p></td><td className="px-5 py-4">{row.contacts}</td><td className="px-5 py-4">{row.requests}</td><td className="px-5 py-4">{row.status}</td></tr> : <tr key={row.id} className="hover:bg-blue-50/40"><td className="px-5 py-4"><strong>{row.learnerName}</strong><p className="text-xs text-slate-500">{row.learnerEmail}</p></td><td className="px-5 py-4">{row.courseTitle}</td><td className="px-5 py-4">{row.enrollmentStatus}</td><td className="px-5 py-4">{row.status}{row.score ? <p className="text-xs text-slate-500">Score: {row.score}</p> : null}</td><td className="px-5 py-4">{row.reviewedBy || 'Awaiting review'}{row.reviewedAt ? <p className="text-xs text-slate-500">{new Date(row.reviewedAt).toLocaleDateString()}</p> : null}</td></tr>)}</tbody></table></div>
    )}
  </section>;
}
