import cntl from "cntl";

import Owl from "../components/icons/Owl";
import { useAuth } from "../contexts/Auth";
import Google from "../components/icons/Google";
import DarkToggle from "../components/DarkToggle";

export default function AuthPage(props: React.HTMLProps<HTMLElement>) {
  const auth = useAuth();

  const classes = {
    section: cntl`
      mx-3
      my-6
      flex
      grow
      flex-col
      items-center
      text-neutral-0
      sm:min-w-[500px]
    `,
    button: cntl`
      p-6
      my-2
      flex
      w-full
      text-lg
      rounded-lg
      justify-center
      bg-neutral-1000/25
    `,
  };
  return (
    <section {...props} className={classes.section}>
      <Owl className="h-10 w-10" />
      <h1 className="p-4 text-center text-2xl font-light uppercase opacity-80">
        Owlet Management Portal
      </h1>
      <button className={classes.button} onClick={() => auth?.signin?.()}>
        <Google className="mr-2 h-6 w-6 pt-1" /> Sign In with Google
      </button>
      <div className="mt-3 flex grow flex-col justify-end">
        <DarkToggle />
      </div>
    </section>
  );
}
