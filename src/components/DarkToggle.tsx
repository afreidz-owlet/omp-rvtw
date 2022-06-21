import cntl from "cntl";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

import useDarkMode from "../hooks/useDarkMode";

export default function DarkToggle() {
  const { enabled, toggle } = useDarkMode();

  const classes = {
    switch: (dark: boolean | undefined) => cntl`
      ${!!dark ? cntl`bg-secondary-yellow-600` : cntl`bg-secondary-purple-800`}
      h-9
      flex
      relative
      w-[65px]
      shrink-0
      border-2
      ease-in-out
      align-middle
      inline-block
      rounded-full
      duration-200
      cursor-pointer
      transition-colors
      border-transparent
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-white
      focus-visible:ring-opacity-75
    `,
    pill: (dark: boolean | undefined) => cntl`
      ${!!dark ? cntl`translate-x-7` : cntl`translate-x-0`}
      h-8
      w-8
      ring-0
      bg-white
      transform
      shadow-lg
      transition
      inline-grid
      ease-in-out
      rounded-full
      duration-200
      text-neutral-600
      pointer-events-none
      place-content-center
    `,
  };

  return (
    <Switch
      checked={!!enabled}
      onChange={() => toggle?.()}
      className={classes.switch(enabled)}
    >
      <span className="sr-only">Enable Dark Mode</span>
      <span aria-hidden="true" className={classes.pill(enabled)}>
        {enabled ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </span>
    </Switch>
  );
}
