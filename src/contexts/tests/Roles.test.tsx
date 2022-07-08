import { MockedFunction } from "vitest";
import { renderHook, act } from "@testing-library/react";

import db from "../../adapters/db";
import RolesContext, { useRoles } from "../Roles";

vi.mock("../../adapters/db", () => ({
  default: {
    addRole: vi.fn(),
    addPermission: vi.fn(),
    updateRole: vi.fn().mockReturnValue(Promise.resolve()),
    getRoles: vi.fn().mockReturnValue(Promise.resolve([])),
    getPermissions: vi.fn().mockReturnValue(Promise.resolve([])),
  },
}));

const mockNotify = vi.fn();
vi.mock("../Notifications", () => ({
  useNotifications: () => mockNotify, 
}));

const wrapper = ({ children }: { children: JSX.Element }) => (
  <RolesContext>{children}</RolesContext>
);

describe("Roles Context", () => {

  it("should have a default state", () => {
    const { result } = renderHook(() => useRoles(), { wrapper });
    expect(result.current.loading).toBe(true);
    expect(result.current.roles).toStrictEqual([]);
    expect(result.current.permissions).toStrictEqual([]);
  });

  it("should load roles and permissions", async () => {
    (db.getRoles as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve([{ id: "testRole1", title: "test role 1" }])
    );
    (db.getPermissions as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve([{ id: "testPerm1", title: "test permission 1" }])
    );
    const { result } = renderHook(() => useRoles(), { wrapper });
    await new Promise((r) => setTimeout(r, 1));
    expect(result.current.roles[0].title).toBe("test role 1");
    expect(result.current.permissions[0].title).toBe("test permission 1");
  });

  it("should handle adding roles", async () => {
    (db.addRole as MockedFunction<any>).mockReturnValueOnce("aaa");
    const { result } = renderHook(() => useRoles(), { wrapper });
    await new Promise((r) => setTimeout(r, 1));
    act(() => {
      result.current.addRole?.("test role 1");
    });
    expect(mockNotify).toHaveBeenCalled();
    expect(result.current.roles[0].id).toBe("aaa");
    expect(result.current.roles[0].title).toBe("test role 1");
  });

  it("should handle adding permissions", async () => {
    (db.addPermission as MockedFunction<any>).mockReturnValueOnce("bbb");
    const { result } = renderHook(() => useRoles(), { wrapper });
    await new Promise((r) => setTimeout(r, 1));
    act(() => {
      result.current.addPermission?.("test permission 1");
    });
    expect(mockNotify).toHaveBeenCalled();
    expect(result.current.permissions[0].id).toBe("bbb");
    expect(result.current.permissions[0].title).toBe("test permission 1");
  });

  it("should handle updating roles", async () => {
    (db.getRoles as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve([{ id: "testRole1", title: "test role 1" }])
    );
    (db.getRoles as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve([
        { id: "testRole1", title: "test role 1", permissions: ["testPerm1"] },
      ])
    );
    (db.getPermissions as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve([{ id: "testPerm1", title: "test permission 1" }])
    );
    (db.getPermissions as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve([
        { id: "testPerm1", title: "test permission 1", roles: ["testRole1"] },
      ])
    );

    const { result } = renderHook(() => useRoles(), { wrapper });
    await new Promise((r) => setTimeout(r, 1));

    expect(result.current.roles.length).toBe(1);
    expect(result.current.permissions.length).toBe(1);
    expect(result.current.roles[0].permissions).toBeFalsy();
    expect(result.current.permissions[0].roles).toBeFalsy();

    act(() => {
      result.current.updateRole?.(
        { id: "testRole1", title: "test role 1" },
        { id: "testPerm1", title: "testPerm1" },
        true
      );
    });
  });
});
