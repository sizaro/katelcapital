import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { KeyRound, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';

const ACCESS_QUERY = gql`
  query AccessControl {
    accessRoles { id name displayName description isSystem permissionKeys userCount }
    accessPermissions { id key description }
    accessUsers { id email firstName lastName status roleId role effectivePermissions overrides { permission effect reason } }
  }
`;
const ASSIGN_ROLE = gql`
  mutation AssignUserRole($input: AssignUserRoleInput!) {
    assignUserRole(input: $input) { id role roleId }
  }
`;
const SET_ROLE_PERMISSIONS = gql`
  mutation SetRolePermissions($input: SetRolePermissionsInput!) {
    setRolePermissions(input: $input) { id permissionKeys }
  }
`;

export default function AdminAccessControl() {
  const { data, loading, error, refetch } = useQuery(ACCESS_QUERY, { fetchPolicy: 'cache-and-network' });
  const [assignRole, { loading: assigning }] = useMutation(ASSIGN_ROLE);
  const [setRolePermissions, { loading: savingRole }] = useMutation(SET_ROLE_PERMISSIONS);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const roles = data?.accessRoles ?? [];
  const permissions = data?.accessPermissions ?? [];
  const users = data?.accessUsers ?? [];
  const selectedRole = roles.find((role: any) => role.id === selectedRoleId) ?? null;

  const changeRole = async (userId: string, roleId: string) => {
    try {
      setMessage(null);
      await assignRole({ variables: { input: { userId, roleId } } });
      await refetch();
      setMessage('The user role was updated. New access takes effect on the next access refresh.');
    } catch (mutationError) {
      setMessage(mutationError instanceof Error ? mutationError.message : 'The user role could not be updated.');
    }
  };

  const savePermissions = async (permissionKeys: string[]) => {
    if (!selectedRole) return;
    try {
      setMessage(null);
      await setRolePermissions({ variables: { input: { roleId: selectedRole.id, permissionKeys } } });
      await refetch();
      setMessage('Role permissions were updated.');
    } catch (mutationError) {
      setMessage(mutationError instanceof Error ? mutationError.message : 'Role permissions could not be updated.');
    }
  };

  if (loading && !data) return <div className="mt-8 h-64 animate-pulse rounded-3xl bg-slate-200" />;
  if (error) return <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">Access control could not be loaded. {error.message}</div>;

  return <section className="mt-8 space-y-8">
    <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex gap-3"><span className="rounded-2xl bg-blue-50 p-3 text-[#003F8E]"><ShieldCheck size={24} /></span><div><h2 className="text-2xl font-bold text-slate-900">Access control</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Review every account, assign its role, and manage permission coverage. The protected Super Admin role cannot be reduced.</p></div></div><button type="button" onClick={() => void refetch()} className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RefreshCw size={16} /> Refresh</button></div>
    {message && <p className={`rounded-xl p-4 text-sm ${message.includes('could not') || message.includes('not be') ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'}`}>{message}</p>}

    <section className="overflow-hidden rounded-3xl border bg-white shadow-sm"><div className="border-b px-5 py-4"><div className="flex items-center gap-2"><Users size={18} className="text-[#003F8E]" /><h3 className="font-bold">Users and roles</h3></div><p className="mt-1 text-sm text-slate-500">Assign one system role per account. Direct permission overrides remain visible on each row.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">User</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Direct overrides</th><th className="px-5 py-3">Change role</th></tr></thead><tbody className="divide-y">{users.map((user: any) => <tr key={user.id} className="hover:bg-blue-50/40"><td className="px-5 py-4"><strong>{user.firstName} {user.lastName}</strong><p className="text-xs text-slate-500">{user.email}</p></td><td className="px-5 py-4">{user.status}</td><td className="px-5 py-4">{user.role}</td><td className="px-5 py-4 text-xs text-slate-600">{user.overrides.length ? user.overrides.map((override: any) => `${override.effect}: ${override.permission}`).join(', ') : 'None'}</td><td className="px-5 py-4"><select disabled={assigning || user.role === 'SUPER_ADMIN'} value={user.roleId} onChange={(event) => void changeRole(user.id, event.target.value)} className="rounded-lg border bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">{roles.map((role: any) => <option key={role.id} value={role.id}>{role.displayName}</option>)}</select></td></tr>)}</tbody></table></div></section>

    <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]"><div className="rounded-3xl border bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><KeyRound size={18} className="text-[#003F8E]" /><h3 className="font-bold">System roles</h3></div><div className="mt-4 space-y-2">{roles.map((role: any) => <button type="button" key={role.id} onClick={() => setSelectedRoleId(role.id)} className={`w-full rounded-xl border p-4 text-left transition ${selectedRoleId === role.id ? 'border-[#003F8E] bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}><div className="flex justify-between gap-3"><strong>{role.displayName}</strong><span className="text-xs text-slate-500">{role.userCount} users</span></div><p className="mt-1 text-xs text-slate-500">{role.permissionKeys.length} permissions · {role.isSystem ? 'System role' : 'Custom role'}</p></button>)}</div></div>
      <div className="rounded-3xl border bg-white p-5 shadow-sm">{selectedRole ? <RolePermissionEditor key={selectedRole.id} role={selectedRole} permissions={permissions} saving={savingRole} onSave={savePermissions} /> : <div className="grid min-h-64 place-items-center text-center text-sm text-slate-500">Choose a role to inspect or update its permission coverage.</div>}</div>
    </section>
  </section>;
}

function RolePermissionEditor({ role, permissions, saving, onSave }: { role: any; permissions: any[]; saving: boolean; onSave: (keys: string[]) => void }) {
  const [keys, setKeys] = useState<string[]>(role.permissionKeys);
  const toggle = (key: string) => setKeys((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  const protectedRole = role.name === 'SUPER_ADMIN';
  return <><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-[#003F8E]">{role.displayName}</p><h3 className="mt-1 text-xl font-bold text-slate-900">Role permissions</h3><p className="mt-1 text-sm text-slate-500">{protectedRole ? 'Super Admin coverage is intentionally protected.' : 'Select exactly what this role may do.'}</p></div>{!protectedRole && <button type="button" disabled={saving} onClick={() => onSave(keys)} className="rounded-xl bg-[#003F8E] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save permissions'}</button>}</div><div className="mt-5 grid gap-2 sm:grid-cols-2">{permissions.map((permission: any) => <label key={permission.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700"><input type="checkbox" disabled={protectedRole} checked={keys.includes(permission.key)} onChange={() => toggle(permission.key)} className="mt-1" /><span><strong>{permission.key}</strong>{permission.description && <span className="mt-0.5 block text-xs text-slate-500">{permission.description}</span>}</span></label>)}</div></>;
}
