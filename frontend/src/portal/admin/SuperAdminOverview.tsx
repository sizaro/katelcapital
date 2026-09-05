import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Activity, AlertTriangle, CheckCircle2, RefreshCw, ShieldCheck, Users } from 'lucide-react';

type Metric = { key: string; label: string; value: number };
type RoleSummary = { role: string; displayName: string; users: number; activeUsers: number; permissions: number };
type UserSummary = { id: string; name: string; email: string; role: string; status: string; createdAt: string; lastLoginAt?: string };
type ActivityItem = { id: string; kind: string; title: string; detail: string; actor: string; occurredAt: string; successful: boolean };
type AdminDashboardData = {
  accountMetrics: Metric[];
  systemMetrics: Metric[];
  roles: RoleSummary[];
  recentUsers: UserSummary[];
  recentActivity: ActivityItem[];
};

const QUERY = gql`
  query SuperAdminDashboard {
    superAdminDashboard {
      accountMetrics { key label value }
      systemMetrics { key label value }
      roles { role displayName users activeUsers permissions }
      recentUsers { id name email role status createdAt lastLoginAt }
      recentActivity { id kind title detail actor occurredAt successful }
    }
  }
`;

const dateTime = new Intl.DateTimeFormat('en-UG', { dateStyle: 'medium', timeStyle: 'short' });
const formatDate = (value?: string) => value ? dateTime.format(new Date(value)) : 'Never';

function MetricGrid({ metrics, accent }: { metrics: Metric[]; accent: 'blue' | 'gold' }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article key={metric.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className={`mb-4 h-2 w-12 rounded-full ${accent === 'blue' ? 'bg-[#003F8E]' : 'bg-[#F7C621]'}`} />
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{metric.value.toLocaleString()}</p>
        </article>
      ))}
    </div>
  );
}

export default function SuperAdminOverview() {
  const { data, loading, error, refetch } = useQuery<{ superAdminDashboard: AdminDashboardData }>(QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const dashboard = data?.superAdminDashboard;

  if (loading && !dashboard) {
    return <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-32 animate-pulse rounded-2xl bg-slate-200" />)}</div>;
  }
  if (error || !dashboard) {
    return (
      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
        <div className="flex items-center gap-3"><AlertTriangle /><strong>Administrative data could not be loaded.</strong></div>
        <button type="button" onClick={() => void refetch()} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2 font-semibold text-white"><RefreshCw size={16} /> Retry</button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      <section>
        <div className="mb-4 flex items-center gap-3"><Users className="text-[#003F8E]" /><div><h2 className="text-xl font-bold">Account health</h2><p className="text-sm text-slate-500">Live identity, session, and access-control totals.</p></div></div>
        <MetricGrid metrics={dashboard.accountMetrics} accent="blue" />
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3"><Activity className="text-amber-500" /><div><h2 className="text-xl font-bold">Platform records</h2><p className="text-sm text-slate-500">Current records across the Academy-to-deployment journey.</p></div></div>
        <MetricGrid metrics={dashboard.systemMetrics} accent="gold" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-5 py-4"><h2 className="font-bold">Role distribution</h2><p className="text-sm text-slate-500">Users and effective role-level permission coverage.</p></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Role</th><th className="px-5 py-3">Users</th><th className="px-5 py-3">Active</th><th className="px-5 py-3">Permissions</th></tr></thead>
              <tbody className="divide-y">{dashboard.roles.map((role) => <tr key={role.role} className="hover:bg-blue-50/40"><td className="px-5 py-4"><strong>{role.displayName}</strong><p className="text-xs text-slate-400">{role.role}</p></td><td className="px-5 py-4">{role.users}</td><td className="px-5 py-4 text-emerald-700">{role.activeUsers}</td><td className="px-5 py-4">{role.permissions}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2"><ShieldCheck className="text-[#003F8E]" /><h2 className="font-bold">Recent activity</h2></div>
          <div className="max-h-[430px] space-y-3 overflow-y-auto pr-1">
            {dashboard.recentActivity.map((item) => <article key={`${item.kind}-${item.id}`} className="rounded-xl border border-slate-100 bg-slate-50 p-3"><div className="flex items-start gap-3">{item.successful ? <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" /> : <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600" />}<div className="min-w-0"><p className="font-semibold">{item.title}</p><p className="truncate text-xs text-slate-500">{item.actor} · {item.detail}</p><p className="mt-1 text-xs text-slate-400">{formatDate(item.occurredAt)}</p></div></div></article>)}
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-5 py-4"><h2 className="font-bold">Recently created users</h2><p className="text-sm text-slate-500">Latest accounts and their current access state.</p></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">User</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Created</th><th className="px-5 py-3">Last login</th></tr></thead>
            <tbody className="divide-y">{dashboard.recentUsers.map((user) => <tr key={user.id} className="hover:bg-blue-50/40"><td className="px-5 py-4"><strong>{user.name}</strong><p className="text-xs text-slate-500">{user.email}</p></td><td className="px-5 py-4">{user.role}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : user.status === 'DISABLED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{user.status}</span></td><td className="px-5 py-4 text-slate-600">{formatDate(user.createdAt)}</td><td className="px-5 py-4 text-slate-600">{formatDate(user.lastLoginAt)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
