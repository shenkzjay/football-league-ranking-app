"use client";

import { useEffect } from "react";
import { createPlayer } from "../formaction/createplayer-action";
import { useFormState } from "react-dom";
import { getAllPlayers } from "@/app/queries/getallplayers";
import { Player } from "@/types/player";

export const CreatePlayers = () => {
  const initialState = {
    message: "",
  };

  const { data, isError, isPending } = getAllPlayers();

  const playerData: Player[] = data;

  console.log({ data });

  const [state, formAction] = useFormState(createPlayer, initialState);
  return (
    <section className="flex gap-4 p-4 ">
      <form
        action={formAction}
        className="w-[40%] bg-white flex-col flex  p-6 border gap-6 h-screen rounded-xl"
      >
        <legend className="font-bold text-xl">Add Team players</legend>
        <fieldset className="w-full">
          <div className="flex flex-col w-full gap-4">
            <label htmlFor="playername" className="sr-only">
              Enter player's name or alias
            </label>
            <input
              type="text"
              name="playername"
              id="playername"
              placeholder="Enter player's name"
              className="border rounded-xl py-2 px-4 w-full"
            />

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

            <button className="py-2 mt-4 px-4 bg-black rounded-xl text-white">Add player</button>
          </div>
        </fieldset>
        <p>{state?.message}</p>
      </form>
      <section className="bg-white w-full p-6 rounded-xl">
        <h2>List of Players</h2>
        <table className="w-full text-left bg">
          <thead>
            <tr className="">
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Goal</th>
              <th className="px-4 py-2">Assist</th>
              <th className="px-4 py-2">yellowCard</th>
              <th className="px-4 py-2">redCard</th>
            </tr>
          </thead>
          <tbody>
            {playerData && playerData.length > 0 ? (
              playerData.map((player, index) => (
                <tr key={player.id}>
                  <td className="px-4 py-2">{player.id}</td>
                  <td className="px-4 py-2">{player.playerName}</td>
                  <td className="px-4 py-2">{player.goal}</td>
                  <td className="px-4 py-2">{player.assist}</td>
                  <td className="px-4 py-2">{player.yellowCard}</td>
                  <td className="px-4 py-2">{player.redCard}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2">1</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
};
