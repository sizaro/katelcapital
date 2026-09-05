import type { Role } from '../types/auth';

export type PortalKind = 'admin' | 'staff' | 'professional' | 'academy' | 'client';

export type PortalDefinition = {
  kind: PortalKind;
  path: string;
  label: string;
  roles: readonly Role[];
};

export const PORTALS: Record<PortalKind, PortalDefinition> = {
  admin: {
    kind: 'admin',
    path: '/portal/admin',
    label: 'Super Admin Portal',
    roles: ['SUPER_ADMIN'],
  },
  staff: {
    kind: 'staff',
    path: '/portal/staff',
    label: 'Staff Operations Portal',
    roles: ['ADMIN', 'TALENT_SUCCESS_MANAGER', 'VETTING_OFFICER', 'ACADEMY_MANAGER'],
  },
  professional: {
    kind: 'professional',
    path: '/portal/professional',
    label: 'Professional Portal',
    roles: ['PROFESSIONAL'],
  },
  academy: {
    kind: 'academy',
    path: '/portal/academy',
    label: 'Academy Portal',
    roles: ['ACADEMY_LEARNER'],
  },
  client: {
    kind: 'client',
    path: '/portal/client',
    label: 'Client Portal',
    roles: ['CLIENT'],
  },
};

export function portalForRole(role: Role): PortalDefinition {
  const portal = Object.values(PORTALS).find((candidate) => candidate.roles.includes(role));
  if (!portal) throw new Error(`No portal is configured for role ${role}`);
  return portal;
}

export function portalPathForRole(role: Role) {
  return portalForRole(role).path;
}

export function roleCanAccessPortal(role: Role, portal: PortalKind) {
  return PORTALS[portal].roles.includes(role);
}

export function isPathInsideRolePortal(role: Role, path: string) {
  const portalPath = portalPathForRole(role);
  return path === portalPath || path.startsWith(`${portalPath}/`);
}

export function portalDestinationForRequest(role: Role, requestedPortal: PortalKind) {
  return roleCanAccessPortal(role, requestedPortal)
    ? PORTALS[requestedPortal].path
    : portalPathForRole(role);
}
