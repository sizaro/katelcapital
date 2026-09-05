import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Bell, BookOpen, BriefcaseBusiness, Building2, LogOut, Menu, ShieldCheck, UserCog, Users } from 'lucide-react';
import { useState, type ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import type { DashboardData } from '../types/auth';
import { PORTALS, type PortalKind } from './portalAccess';

const QUERY = gql`
  query Dashboard {
    dashboard { heading description metrics { key label value } }
  }
`;

type NavigationItem = { label: string; icon: ElementType; visible: boolean };

export default function PortalDashboard({ portal, children, heading, description }: { portal: PortalKind; children?: React.ReactNode; heading?: string; description?: string }) {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, loading, error, refetch } = useQuery<{ dashboard: DashboardData }>(QUERY, {
    fetchPolicy: 'cache-and-network',
    skip: Boolean(children),
  });
  const role = user?.role ?? '';
  const portalDefinition = PORTALS[portal];
  const navigation: NavigationItem[] = [
    { label: 'Overview', icon: BriefcaseBusiness, visible: true },
    { label: 'Academy', icon: BookOpen, visible: role === 'ACADEMY_LEARNER' || hasPermission('academy.view') },
    { label: 'Professionals', icon: Users, visible: role === 'PROFESSIONAL' || hasPermission('professionals.view') },
    { label: 'Clients', icon: Building2, visible: role === 'CLIENT' || hasPermission('clients.view') },
    { label: 'Readiness', icon: ShieldCheck, visible: hasPermission('professionals.approve_ready') || hasPermission('professionals.vet') },
    { label: 'Access control', icon: UserCog, visible: hasPermission('users.view') || hasPermission('roles.view') },
  ].filter((item) => item.visible);

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-lg p-2 lg:hidden" aria-label="Toggle workspace navigation">
              <Menu />
            </button>
            <img src="/images/katel_capital_logo1.png" alt="Katel Capital" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <strong className="text-[#003F8E]">Katel Capital</strong>
              <p className="text-xs text-slate-500">{portalDefinition.label} · {role.replaceAll('_', ' ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-full border p-2" aria-label="Notifications"><Bell size={18} /></button>
            <button type="button" onClick={() => void signOut()} className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-slate-100">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[250px_1fr]">
        <aside className={`${open ? 'block' : 'hidden'} min-h-[calc(100vh-65px)] border-r bg-white p-4 lg:block`}>
          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">Workspace</p>
          {navigation.map(({ label, icon: Icon }) => (
            <button type="button" key={label} onClick={() => setOpen(false)} className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium hover:bg-blue-50 hover:text-[#003F8E]">
              <Icon size={18} /> {label}
            </button>
          ))}
        </aside>

        <main className="p-5 md:p-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#003F8E] to-[#1264b7] p-7 text-white shadow-xl">
            <p className="text-sm text-blue-100">Welcome, {user?.firstName}</p>
            <h1 className="mt-2 text-3xl font-bold">{heading || data?.dashboard.heading || 'Your Katel workspace'}</h1>
            <p className="mt-2 max-w-2xl text-blue-100">{description || data?.dashboard.description || 'Loading your authorized operating view.'}</p>
          </div>

          {children || <>{loading && !data && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-32 animate-pulse rounded-2xl bg-slate-200" />)}
            </div>
          )}
          {error && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              We could not load dashboard data.{' '}
              <button type="button" onClick={() => void refetch()} className="font-bold underline">Retry</button>
            </div>
          )}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data?.dashboard.metrics.map((metric, index) => (
              <article key={metric.key} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className={`mb-5 h-2 w-12 rounded-full ${index % 3 === 0 ? 'bg-[#F7C621]' : index % 3 === 1 ? 'bg-[#003F8E]' : 'bg-emerald-500'}`} />
                <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{metric.value.toLocaleString()}</p>
              </article>
            ))}
          </div></>}
        </main>
      </div>
    </div>
  );
}
