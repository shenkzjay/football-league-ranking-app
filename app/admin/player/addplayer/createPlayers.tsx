"use client";

import { GetAllPlayersFromApi } from "@/app/queries/apigetallplayers";
import { createPlayer } from "../../formaction/playeraction/createplayer-action";
import { useFormState } from "react-dom";
import { Player } from "@/types/player";
import { useState, useRef, useEffect } from "react";
import { updatePlayerData } from "../../formaction/playeraction/updateplayer-action";

export const CreatePlayers = () => {
  const initialState = {
    message: "",
  };

  const { data } = GetAllPlayersFromApi();
  // const { data } = GetAllPlayersFromApi();

  const players: Player[] = data;

  const playerData: Player[] = players?.sort((a, b) => {
    if (a.goal !== b.goal) {
      return b.goal - a.goal;
    }

    if (a.assist !== b.assist) {
      return b.assist - a.assist;
    }

    if (a.yellowCard !== b.yellowCard) {
      return b.yellowCard - a.yellowCard;
    }

    return b.redCard - a.redCard;
  });

  const [state, formAction] = useFormState(createPlayer, initialState);

  const [currentPlayer, setCurrentPlayer] = useState<Player>();

  const [editMode, setEditMode] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState(playerData);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const playersPerPage = 10;

  const indexOfLastPage = currentPage * playersPerPage;

  const indexOfFirstPage = indexOfLastPage - playersPerPage;

  const currentPlayerStats = filteredData?.slice(indexOfFirstPage, indexOfLastPage);
  const startIndexOfSN = (currentPage - 1) * playersPerPage;

  useEffect(() => {
    //populate the fields with current formData
    if (editMode && currentPlayer && formRef.current) {
      // Populate form fields with current team data when in edit mode
      formRef.current.playername.value = currentPlayer.playerName;
      formRef.current.goal.value = currentPlayer.goal;
      formRef.current.assist.value = currentPlayer.assist;
      formRef.current.yellowCard.value = currentPlayer.yellowCard;
      formRef.current.redCard.value = currentPlayer.redCard;
    }

    const filteredTeams = playerData?.filter((player) =>
      player?.playerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredData(filteredTeams);
  }, [currentPlayer, editMode, searchQuery, playerData]);

  const handleEditPlayer = (player: Player) => {
    setCurrentPlayer(player);
    setEditMode(true);
  };

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
    <section className="flex gap-4 p-4 bg-white h-screen">
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

      <div className="h-[40vw]  overflow-auto">
        <div>
          <label className="sr-only">Search players name</label>
          <input
            type="playername"
            name="playername"
            id="playername"
            className="py-2 px-4 border rounded-xl"
            placeholder="search players name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="w-full text-left bg">
          <thead>
            <tr className="">
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Goal</th>
              <th className="px-4 py-2">Assist</th>
              <th className="px-4 py-2">yellowCard</th>
              <th className="px-4 py-2">redCard</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPlayerStats && currentPlayerStats.length > 0 ? (
              currentPlayerStats.map((player, index) => (
                <tr key={player.playerName}>
                  <td className="px-4 py-2">{startIndexOfSN + index + 1}</td>
                  <td className="px-4 py-2">{player.playerName}</td>
                  <td className="px-4 py-2">{player.goal}</td>
                  <td className="px-4 py-2">{player.assist}</td>
                  <td className="px-4 py-2">{player.yellowCard}</td>
                  <td className="px-4 py-2">{player.redCard}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleEditPlayer(player)}>Edit</button>
                  </td>
                  <td className="px-4 py-2">
                    <button>delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2">1</td>
              </tr>
            )}
          </tbody>
        </table>

        <section className="flex justify-center">
          {Array.from({ length: Math.ceil(playerData?.length / playersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                paginate(i + 1);
              }}
              className={`mx-1 px-4 pagination py-2 mt-10 rounded-xl  justify-center ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100 border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </section>
      </div>
    </section>
  );
};
