import adapters from "./";
import { ref, push, get, child, update, DataSnapshot } from "firebase/database";

export interface IRole {
  id: string | null;
  title: string;
  permissions?: string[];
}

export interface IPermission {
  id: string | null;
  title: string;
  roles?: string[];
}

const db = adapters.get("DATABASE");

function valOrEmptyArray(snap: DataSnapshot) {
  return snap.exists() ? snap.val() : [];
}

export function addRole(role: IRole) {
  return push(ref(db, "/roles"), role).key;
}

export function addPermission(permission: IPermission) {
  return push(ref(db, "/permissions"), permission).key;
}

export function updateRole(r: IRole, p: IPermission, state: boolean) {
  const updates = {
    [`/role-permissions/${r.id}/${p.id}`]: state || null,
    [`/permission-roles/${p.id}/${r.id}`]: state || null,
  };
  return update(ref(db), updates);
}

export async function getRoles() {
  const dbRoles = await get(child(ref(db), "/roles")).then(valOrEmptyArray);
  const roles = Object.entries(dbRoles as IRole[]).map(([k, v]) => ({
    ...v,
    id: k,
  }));

  await Promise.all(
    roles.map(async (role: IRole) => {
      const perms = await get(
        child(ref(db), `/role-permissions/${role.id}`)
      ).then(valOrEmptyArray);
      role.permissions = Object.keys(perms);
      return;
    })
  );

  return roles;
}

export async function getPermissions() {
  const dbPerms = await get(child(ref(db), "/permissions")).then(
    valOrEmptyArray
  );
  const permissions = Object.entries(dbPerms as IPermission[]).map(
    ([k, v]) => ({ ...v, id: k })
  );

  await Promise.all(
    permissions.map(async (permission: IPermission) => {
      const roles = await get(
        child(ref(db), `/permission-roles/${permission.id}`)
      ).then(valOrEmptyArray);
      permission.roles = Object.keys(roles);
      return;
    })
  );

  return permissions;
}

export default { getRoles, getPermissions, addRole, addPermission, updateRole };
