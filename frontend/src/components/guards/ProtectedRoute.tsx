import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthProvider';
import type { PortalKind } from '../../portal/portalAccess';
import { portalDestinationForRequest, roleCanAccessPortal } from '../../portal/portalAccess';

function LoadingPortal() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50" role="status" aria-label="Restoring session">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#003F8E] border-t-[#F7C621]" />
    </div>
  );
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingPortal />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

export function PortalRoute({ portal, children }: { portal: PortalKind; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingPortal />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!roleCanAccessPortal(user.role, portal)) {
    return <Navigate to={portalDestinationForRequest(user.role, portal)} replace />;
  }
  return <>{children}</>;
}

export function PermissionGuard({ permission, children }: { permission: string; children: React.ReactNode }) {
  return useAuth().hasPermission(permission) ? <>{children}</> : null;
}
