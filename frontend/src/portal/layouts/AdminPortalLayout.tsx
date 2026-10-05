import { BookOpen, Building2, ShieldCheck, UserCog, Users } from 'lucide-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PortalDashboard, { type PortalNavigationItem } from '../PortalDashboard';
import SuperAdminOverview from '../admin/SuperAdminOverview';
import { AcademyManagerDashboard } from './AcademyPortalLayout';
import AdminAccessControl from '../admin/AdminAccessControl';
import AdminRecords from '../admin/AdminRecords';

const navigation: PortalNavigationItem[] = [
  { label: 'Overview', icon: ShieldCheck, path: '/portal/admin' },
  { label: 'Academy', icon: BookOpen, path: '/portal/admin/academy' },
  { label: 'Professionals', icon: Users, path: '/portal/admin/professionals' },
  { label: 'Clients', icon: Building2, path: '/portal/admin/clients' },
  { label: 'Readiness', icon: ShieldCheck, path: '/portal/admin/readiness' },
  { label: 'Access control', icon: UserCog, path: '/portal/admin/access-control' },
];

export default function AdminPortalLayout() {
  return (
    <PortalDashboard
      portal="admin"
      heading="Platform control centre"
      description="Monitor account health, access, activity, Academy delivery, and the complete Katel operating system."
      navigationItems={navigation}
    >
      <Routes>
        <Route index element={<SuperAdminOverview />} />
        <Route path="academy" element={<AcademyManagerDashboard />} />
        <Route path="professionals" element={<AdminRecords section="professionals" />} />
        <Route path="clients" element={<AdminRecords section="clients" />} />
        <Route path="readiness" element={<AdminRecords section="readiness" />} />
        <Route path="access-control" element={<AdminAccessControl />} />
        <Route path="*" element={<Navigate to="/portal/admin" replace />} />
      </Routes>
    </PortalDashboard>
  );
}
