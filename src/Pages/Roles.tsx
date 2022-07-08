import cntl from "cntl";
import { Fragment } from "react";
import Button from "../components/Button";
import { Dialog } from "@headlessui/react";
import { FormEvent, useState } from "react";
import Heading from "../components/Heading";
import { useRoles } from "../contexts/Roles";
import TextField from "../components/TextField";
import { useDarkMode } from "../contexts/DarkMode";
import { IRole, IPermission } from "../adapters/db";

export default function RolesPage() {
  const dark = useDarkMode();
  const [addingRole, setAddingRole] = useState(false);
  const [addingPermission, setAddingPermission] = useState(false);
  const { roles, loading, permissions, addRole, addPermission, updateRole } =
    useRoles();

  const shadowXClass = "shadow-[5px_0px_5px_rgba(0,0,0,0.05)]";
  const shadowYClass = "shadow-[0px_5px_5px_rgba(0,0,0,0.05)]";

  const classes = {
    header: cntl`
      p-4
      px-6
      flex
      gap-2
      flex-wrap
      items-center
`,
    dialog: (dark: boolean) => cntl`
      ${dark ? "dark" : "light"}
      p-4
      flex 
      fixed
      inset-0
      items-center
      justify-center
      bg-neutral-1000/50
`,
    panel: cntl`
      p-4
      flex
      w-full
      h-full
      flex-col
      md:h-auto
      md:w-auto
      max-w-none
      rounded-lg
      min-w-[40%]
      md:max-w-sm
      bg-neutral-0
      drop-shadow-xl
      dark:text-neutral-0
      dark:bg-secondary-blue-900
`,
    container: cntl`
      my-4
      mx-6
      grow
      relative
      overflow-auto
`,
    table: cntl`
      grid
      border-neutral-400
      dark:border-neutral-100
`,
    blank: cntl`
      ${shadowXClass}
      z-10
      top-0
      sticky
      left-0
      rounded-tl-md
      bg-neutral-400
      dark:bg-neutral-100
      [border-color:inherit]
`,
    stickyRow: cntl`
      ${shadowYClass}
      p-4 
      z-10
      flex
      top-0
      sticky
      bg-neutral-0 
      items-center
      justify-center 
      border border-l-0 
      [border-color:inherit]
      dark:bg-secondary-blue-890
`,
    stickyCol: cntl`
      ${shadowXClass}
      p-4 
      sticky 
      left-0 
      border 
      border-t-0 
      bg-neutral-0 
      [border-color:inherit]
      dark:bg-secondary-blue-890
`,
    cell: cntl`
      flex 
      border-r 
      border-b 
      items-center 
      justify-center 
      bg-neutral-200 
      bg-neutral-1000/[0.02]
      [border-color:inherit]
`,
    label: cntl`
      flex
      top-0
      left-0
      right-0
      bottom-0
      absolute
      items-center
      justify-center
`,
  };

  interface IFormData {
    role: { value: string };
    permission: { value: string };
  }

  async function handleAddRole(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { role } = e.target as typeof e.target & IFormData;
    addRole?.(role.value);
    setAddingRole(false);
  }

  async function handlePermissionAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { permission } = e.target as typeof e.target & IFormData;
    addPermission?.(permission.value);
    setAddingPermission(false);
  }

  function handlePermissionChange(r: IRole, p: IPermission, state: boolean) {
    updateRole?.(r, p, state);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Heading type="page" className={classes.header}>
        <span className="w-full grow sm:w-auto">Roles Management</span>
        {permissions.length > 0 && (
          <Button
            className="grow sm:grow-0"
            onClick={() => setAddingRole(true)}
          >
            New Role
          </Button>
        )}
        <Button
          className="grow sm:grow-0"
          onClick={() => setAddingPermission(true)}
        >
          New Permission
        </Button>
      </Heading>

      <div className={classes.container}>
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <div
            className={classes.table}
            style={{
              minWidth: `${200 * (roles.length + 1)}px`,
              gridTemplateColumns: `repeat(${roles.length + 1},200px)`,
              gridTemplateRows: `repeat(${permissions.length},1fr)`,
            }}
          >
            {roles.length > 0 && <div className={classes.blank} />}
            {roles.map((r) => (
              <div className={classes.stickyRow} key={r.id}>
                {r.title}
              </div>
            ))}
            {permissions.map((p) => (
              <Fragment key={p.id}>
                <div className={classes.stickyCol}>{p.title}</div>
                {roles.map((r) => (
                  <div className={classes.cell} key={`${r.id}-${p.id}`}>
                    <input
                      type="checkbox"
                      checked={r.permissions?.includes(p.id || "")}
                      onChange={(e) =>
                        handlePermissionChange(r, p, e.target.checked)
                      }
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={addingRole}
        className="relative z-50"
        onClose={() => setAddingRole(false)}
      >
        <form className={classes.dialog(dark.enabled)} onSubmit={handleAddRole}>
          <Dialog.Panel className={classes.panel}>
            <Dialog.Title as="header">
              <Heading type="page" as="h3">
                Add new role
              </Heading>
            </Dialog.Title>
            <div className="my-6 grow">
              <TextField id="role" aria-required placeholder="New role name" />
            </div>
            <div className="mb-6 flex justify-end gap-2">
              <Button
                type="reset"
                variant="text"
                onClick={() => setAddingRole(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </div>
          </Dialog.Panel>
        </form>
      </Dialog>

      <Dialog
        open={addingPermission}
        className="relative z-50"
        onClose={() => setAddingPermission(false)}
      >
        <form
          className={classes.dialog(dark.enabled)}
          onSubmit={handlePermissionAdd}
        >
          <Dialog.Panel className={classes.panel}>
            <Dialog.Title as="header">
              <Heading type="page" as="h3">
                Add new permission
              </Heading>
            </Dialog.Title>
            <div className="my-6 grow">
              <TextField
                aria-required
                id="permission"
                placeholder="New permission name"
              />
            </div>
            <div className="mb-6 flex justify-end gap-2">
              <Button
                type="reset"
                variant="text"
                onClick={() => setAddingPermission(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </div>
          </Dialog.Panel>
        </form>
      </Dialog>
    </>
  );
}
