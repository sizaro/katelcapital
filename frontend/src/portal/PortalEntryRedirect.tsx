import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { portalPathForRole } from './portalAccess';

export default function PortalEntryRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to={portalPathForRole(user.role)} replace /> : <Navigate to="/login" replace />;
}
