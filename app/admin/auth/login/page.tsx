"use client";

export const dynamic = "force-dynamic";

import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { signInFormAction } from "../../formaction/signIn-action/signin-action";

const initialState = {
  message: "",
};

export default function LoginForm() {
  const [signInState, signInAction] = useFormState(signInFormAction, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    await signInAction(formData);

    formRef.current?.reset();
    setIsLoading(true);
  };

  return (
    <section className="flex flex-col justify-center w-full items-center">
      {isLoading ? (
        <div className="w-full h-screen loading">
          <p className="loader"></p>
        </div>
      ) : (
        <form
          ref={formRef}
          className="flex flex-col space-y-6 w-1/3 bg-white p-6 mt-32"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="mt-1">
              <input
                id="username"
                name="username"
                aria-label="Username"
                type="text"
                autoCapitalize="off"
                autoComplete="username"
                spellCheck={false}
                required
                maxLength={50}
                className="relative block w-full appearance-none rounded-[1px] border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Username"
              />
            </div>

            <div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  aria-label="Password"
                  type="password"
                  required
                  maxLength={100}
                  className="relative block w-full appearance-none rounded-[1px] border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-[1px] bg-accent1 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 bg-black"
            >
              log in
            </button>
          </div>
          {signInState.message}
        </form>
      )}
    </section>
  );
}
