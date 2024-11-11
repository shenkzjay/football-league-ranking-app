"use client";

import { useState, useRef, useEffect } from "react";
import { Player } from "@/types/player";
import { DeletePlayers } from "@/app/queries/deleteplayer";

export const PlayerList = ({ playerDatas }: { playerDatas: Player[] }) => {
  const playerData: Player[] = playerDatas?.sort((a, b) => {
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

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPlayer, setCurrentPlayer] = useState<Player>();

  const [editMode, setEditMode] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

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
      // formRef.current.goal.value = currentPlayer.goal;
      // formRef.current.assist.value = currentPlayer.assist;
      // formRef.current.yellowCard.value = currentPlayer.yellowCard;
      // formRef.current.redCard.value = currentPlayer.redCard;
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

  const handleDeletePlayer = async (player: Player) => {
    await DeletePlayers(player.id);
  };

  return (
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
                  <button onClick={() => handleDeletePlayer(player)}>delete</button>
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
  );
};
