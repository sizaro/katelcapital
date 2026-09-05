import PortalDashboard from '../PortalDashboard';
import SuperAdminOverview from '../admin/SuperAdminOverview';

export default function AdminPortalLayout() {
  return <PortalDashboard portal="admin" heading="Platform control centre" description="Monitor account health, access, activity, and the complete Katel operating system."><SuperAdminOverview /></PortalDashboard>;
}
