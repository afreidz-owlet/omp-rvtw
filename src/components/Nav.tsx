import cntl from "cntl";
import {
  UserIcon,
  TruckIcon,
  UserGroupIcon,
  DeviceMobileIcon,
} from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const classes = {
    li: cntl`mb-px`,
    text: cntl`sm:hidden lg:block`,
    icon: cntl`w-8 lg:w-6 flex-none mx-4`,
    link: (isActive: boolean) => cntl`
      py-2
      flex
      opacity-50
      border-l-0
      ease-in-out
      duration-200
      items-center
      lg:border-l-4
      justify-start
      lg:justify-start
      sm:justify-center
      hover:opacity-100
      transition-colors
      border-transparent
      hover:bg-neutral-0/5

      ${
        isActive &&
        cntl`
        opacity-100
        border-white
        bg-neutral-0/5
      `
      }
    `,
  };

  return (
    <ul>
      <li className={classes.li}>
        <NavLink
          role="link"
          to="/devices"
          className={({ isActive }) => classes.link(isActive)}
        >
          <DeviceMobileIcon className={classes.icon} />
          <span className={classes.text}>Devices</span>
        </NavLink>
      </li>
      <li className="mb-px">
        <NavLink
          role="link"
          to="/accounts"
          className={({ isActive }) => classes.link(isActive)}
        >
          <UserIcon className={classes.icon} />
          <span className={classes.text}>Accounts</span>
        </NavLink>
      </li>
      <li className="mb-px">
        <NavLink
          role="link"
          to="/employees"
          className={({ isActive }) => classes.link(isActive)}
        >
          <UserGroupIcon className={classes.icon} />
          <span className={classes.text}>Employees</span>
        </NavLink>
      </li>
      <li className="mb-px">
        <NavLink
          role="link"
          to="/manufacturing"
          className={({ isActive }) => classes.link(isActive)}
        >
          <TruckIcon className={classes.icon} />
          <span className={classes.text}>Manufacturing</span>
        </NavLink>
      </li>
    </ul>
  );
}
