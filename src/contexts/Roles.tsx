import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import db, { IPermission, IRole } from "../adapters/db";
import { useNotifications } from "../contexts/Notifications";

interface IRolesContext {
  roles: IRole[];
  loading: boolean;
  permissions: IPermission[];
  addRole?: (title: string) => void;
  addPermission?: (title: string) => void;
  updateRole?: (r: IRole, p: IPermission, state: boolean) => void;
}

const RolesContext = createContext<IRolesContext>({
  roles: [],
  loading: true,
  permissions: [],
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const notify = useNotifications();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  const addRole = useCallback(
    async (title: string) => {
      setLoading(true);
      const role: IRole = { title, id: null };
      const id = db.addRole(role);
      role.id = id;
      setRoles([...roles, role]);
      notify?.(`${title} added`);
      setLoading(false);
    },
    [roles, notify]
  );

  const addPermission = useCallback(
    async (title: string) => {
      setLoading(true);
      const permission: IPermission = { title, id: null };
      const id = db.addPermission(permission);
      permission.id = id;
      setPermissions([...permissions, permission]);
      notify?.(`${title} added`);
      setLoading(false);
    },
    [permissions, notify]
  );

  const updateRole = useCallback(
    async (role: IRole, permission: IPermission, state: boolean) => {
      setLoading(true);
      await db.updateRole(role, permission, state);
      const dbRoles = await db.getRoles();
      const dbPerms = await db.getPermissions();
      console.log(dbRoles, dbPerms);
      setRoles(dbRoles);
      setPermissions(dbPerms);
      setLoading(false);
    },
    []
  );

  const value = { roles, loading, permissions, addRole, addPermission, updateRole };

  useEffect(() => {
    (async function Load() {
      const dbRoles = await db.getRoles();
      const dbPerms = await db.getPermissions();
      setRoles(dbRoles);
      setPermissions(dbPerms);
      setLoading(false);
    })();
  }, []);

  return (
    <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
  );
}

export const useRoles = () => useContext(RolesContext);
