"use client";

import { signOutAction } from "../formaction/signIn-action/signin-action";

export const SignOut = () => {
  return (
    <form>
      <button
        formAction={signOutAction}
        className="rounded-[2px] border-[1px] border-accent1 bg-white px-4 py-2 text-xs font-semibold text-accent1"
      >
        {"Sign Out"}
      </button>
    </form>
  );
};
