"use client";

import { createPlayer } from "../../formaction/createplayer-action";
import { useFormState } from "react-dom";

export default function UpdatePlayerStats() {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(createPlayer, initialState);
  return (
    <section className="flex gap-4 p-4 bg-white h-screen">
      <form
        action={formAction}
        className="w-[40%] bg-white flex-col flex  p-6 border gap-6 h-fit rounded-xl"
      >
        <legend className="font-bold text-xl">Update players stats</legend>
        <fieldset className="w-full">
          <div className="flex flex-col w-full gap-4">
            <select className="border py-2 px-4 w-full rounded-xl" name="hometeam">
              <option value="">Select player</option>
              <option>cubasi</option>
            </select>

            <div className="flex flex-row gap-10">
              <div>
                <label htmlFor="goals" className="sr-only">
                  Number of Goal scored
                </label>
                <input
                  type="number"
                  name="goal"
                  id="goal"
                  placeholder=" ⚽️ Goal Scored"
                  className="border rounded-xl py-2 px-4 w-full"
                />
              </div>
              <div>
                <label htmlFor="assists" className="sr-only">
                  Number of Goal assist
                </label>
                <input
                  type="number"
                  name="assist"
                  id="assist"
                  placeholder=" 🤾🏽‍♂️ Assists"
                  className="border rounded-xl py-2 px-4 w-full"
                />
              </div>
            </div>

            <div className="flex flex-row gap-10">
              <div>
                <label htmlFor="yellowCard" className="sr-only">
                  Number of Yellow card
                </label>
                <input
                  type="number"
                  name="yellowCard"
                  id="yellowCard"
                  placeholder="🟨 Yellow card"
                  className="border rounded-xl py-2 px-4 w-full"
                />
              </div>
              <div>
                <label htmlFor="redCard" className="sr-only">
                  Number of Red card
                </label>
                <input
                  type="number"
                  name="redCard"
                  id="redCard"
                  placeholder="🟥 Red card"
                  className="border rounded-xl py-2 px-4 w-full"
                />
              </div>
            </div>

            <button className="py-2 mt-4 px-4 bg-black rounded-xl text-white">Update stats</button>
          </div>
        </fieldset>
        <p>{state?.message}</p>
      </form>
    </section>
  );
}
