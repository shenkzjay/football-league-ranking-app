"use client";

import { createPlayer } from "../../formaction/playeraction/createplayer-action";
import { useFormState } from "react-dom";
import { useState, useRef, SetStateAction } from "react";
import { Player } from "@/types/player";
import { updatePlayerData } from "../../formaction/playeraction/updateplayer-action";

interface EditProp {
  editMode: boolean;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
  currentPlayer: Player | null;
}

export const PlayerForm = ({ editMode, setEditMode, currentPlayer }: EditProp) => {
  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(createPlayer, initialState);
  //   const [currentPlayer] = useState<Player>();

  console.log({ currentPlayer });

  //   const [editMode, setEditMode] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (editMode && currentPlayer) {
      await updatePlayerData(currentPlayer.id, formData);
    } else {
      formAction(formData);
    }

    setEditMode(false);

    if (!formRef.current) {
      return;
    }

    formRef?.current.reset();
    setEditMode(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="w-[40%] bg-white flex-col flex  p-6 border gap-6 h-fit rounded-xl"
    >
      <legend className="font-bold text-xl">Add Team players</legend>
      <fieldset className="w-full">
        <div className="flex flex-col w-full gap-4">
          <label htmlFor="playername" className="sr-only">
            Enter player&apos;s name or alias
          </label>
          <input
            type="text"
            name="playername"
            id="playername"
            defaultValue={currentPlayer?.playerName}
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

          <button
            className={`py-2 mt-4 px-4  ${
              editMode ? "bg-blue-500" : "bg-black"
            } rounded-xl text-white`}
          >
            {editMode ? "Update Player Stats" : "Add player"}
          </button>
        </div>
      </fieldset>
      <p>{state?.message}</p>
    </form>
  );
};
