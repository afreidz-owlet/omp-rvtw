import cntl from "cntl";
import {
  UserIcon,
  QrcodeIcon,
  UserGroupIcon,
  DeviceMobileIcon,
} from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const classes = {
    li: cntl`mb-px`,
    text: cntl`hidden lg:block`,
    icon: cntl`w-8 lg:w-6 flex-none mx-4`,
    link: (isActive: boolean) => cntl`
      py-2
      flex
      opacity-50
      ease-in-out
      duration-200
      lg:border-l-4
      justify-center
      lg:justify-start
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
          to="/devices"
          className={({ isActive }) => classes.link(isActive)}
        >
          <DeviceMobileIcon className={classes.icon} />
          <span className={classes.text}>Devices</span>
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          to="/accounts"
          className={({ isActive }) => classes.link(isActive)}
        >
          <UserIcon className={classes.icon} />
          <span className={classes.text}>Accounts</span>
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          to="/employees"
          className={({ isActive }) => classes.link(isActive)}
        >
          <UserGroupIcon className={classes.icon} />
          <span className={classes.text}>Employees</span>
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          to="/manufacturing"
          className={({ isActive }) => classes.link(isActive)}
        >
          <QrcodeIcon className={classes.icon} />
          <span className={classes.text}>Manufacturing</span>
        </NavLink>
      </li>
    </ul>
  );
}
