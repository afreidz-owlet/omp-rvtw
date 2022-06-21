import cntl from "cntl";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import Owl from "./Owl";
import Nav from "./Nav";

export default function NavMenu() {
  const itemsClasses = cntl`
    w-60
    left-2
    top-16
    absolute
    sm:hidden
    shadow-2xl
    rounded-md
    bg-neutral-900
    origin-top-left
    overflow-hidden
    focus:outline-none
    dark:bg-secondary-purple-800
  `;

  return (
    <Menu>
      <Menu.Button>
        <Owl className="w-8" />
      </Menu.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-75"
        leaveTo="transform opacity-0 scale-95"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leaveFrom="transform opacity-100 scale-100"
      >
        <Menu.Items className={itemsClasses}>
          <Nav />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
