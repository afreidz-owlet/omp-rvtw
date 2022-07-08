import { MockedFunction } from "vitest";

import db from "../db";
import { push, get, update } from "firebase/database";

vi.mock("firebase/database", () => ({
  ref: vi.fn(),
  get: vi.fn(),
  push: vi.fn(),
  child: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../index", () => {
  const cache = new Map();
  cache.set("DATABASE", "foo");
  return { default: cache };
});

describe("Database adapter", () => {
  it("should handle adding a role", () => {
    (push as MockedFunction<any>).mockReturnValue({ key: "aaa" });
    const testRole = { title: "test role 1", id: null };
    const id = db.addRole(testRole);
    expect(id).toBe("aaa");
  });
  it("should handle adding a permission", () => {
    (push as MockedFunction<any>).mockReturnValue({ key: "aaa" });
    const testPermission = { title: "test permission 1", id: null };
    const id = db.addPermission(testPermission);
    expect(id).toBe("aaa");
  });
  it("should handle updating a role", () => {
    const testRole = { title: "test role 1", id: "aaa" };
    const testPermission = { title: "test permission 1", id: "bbb" };
    db.updateRole(testRole, testPermission, true);
    db.updateRole(testRole, testPermission, false);
    expect(update).toHaveBeenCalledTimes(2);
  });
  it("should handle getting permissions", async () => {
    (get as MockedFunction<any>).mockReturnValue(
      Promise.resolve({
        exists: () => true,
        val: () => ({}),
      })
    );
    (get as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve({
        exists: () => true,
        val: () => ({
          testPermission1: { title: "test permission 1" },
          testPermission2: { title: "test permission 2" },
        }),
      })
    );

    const permission = await db.getPermissions();
    expect(permission.length).toBe(2);
    expect(permission[0].title).toBe("test permission 1");
    expect(permission[1].title).toBe("test permission 2");
    expect(permission[0].roles).toStrictEqual([]);
    expect(permission[1].roles).toStrictEqual([]);
  });

  it("should handle getting roles", async () => {
    (get as MockedFunction<any>).mockReturnValue(
      Promise.resolve({
        exists: () => true,
        val: () => ({}),
      })
    );
    (get as MockedFunction<any>).mockReturnValueOnce(
      Promise.resolve({
        exists: () => true,
        val: () => ({
          testRole1: { title: "test role 1" },
          testRole2: { title: "test role 2" },
        }),
      })
    );

    const roles = await db.getRoles();
    expect(roles.length).toBe(2);
    expect(roles[0].title).toBe("test role 1");
    expect(roles[1].title).toBe("test role 2");
    expect(roles[0].permissions).toStrictEqual([]);
    expect(roles[1].permissions).toStrictEqual([]);
  });

});
