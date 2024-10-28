"use client";

import { Player } from "@/types/player";
import { TeamDetails } from "@/types/team";
import { useState, useEffect } from "react";
import Link from "next/link";

export const TeamStanding = ({
  teamData,
  playerData,
}: {
  teamData: TeamDetails[];
  playerData: Player[];
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const playersPerPage = 5;

  const [search, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Player[]>(playerData);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const filteredTeams = playerData.filter((team) =>
      team.playerName.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredData(filteredTeams);
  }, [search, playerData]);

  const indexOfLastPlayerStats = currentPage * playersPerPage;
  const indexOfFistPlayerStats = indexOfLastPlayerStats - playersPerPage;
  const currentPlayerStats = filteredData.slice(indexOfFistPlayerStats, indexOfLastPlayerStats);
  const startIndexOfSN = (currentPage - 1) * playersPerPage;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="overflow-auto md:mx-0 mx-6 w-full flex flex-col absolute top-[0rem] left-0 tablet">
      <div className="tableu">
        <table className="table text-left overflow-x-scroll w-full text-nowrap text-sm">
          <caption className="text-2xl font-semibold text-center mb-6 text-slate-400"></caption>
          <thead className="">
            <tr className="tablet-row bg-slate-300">
              <th className="p-2">Pos</th>
              <th className="p-2">Team</th>
              <th className="p-2">P</th>
              <th className="p-2">W</th>
              <th className="p-2">L</th>
              <th className="p-2">D</th>
              <th className="p-2">GF</th>
              <th className="p-2">GA</th>
              <th className="p-2">GD</th>
              <th className="p-2">Pts</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {teamData && teamData.length > 0 ? (
              teamData.map((teams, index) => (
                <tr key={teams.teamId} className="even:bg-gray-100 tablet-body">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{teams.title}</td>
                  <td className="p-2">{teams.gamesPlayed}</td>
                  <td className="p-2">{teams.gamesWon}</td>
                  <td className="p-2">{teams.gamesLost}</td>
                  <td className="p-2">{teams.gamesDrawn}</td>
                  <td className="p-2">{teams.goalFor}</td>
                  <td className="p-2">{teams.goalAgainst}</td>
                  <td className="p-2">{teams.goalDifference}</td>
                  <td className="p-2">{teams.points}</td>
                  <td className="p-2">
                    <Link
                      href={`/team/${teams.teamId}`}
                      className="text-sm text-blue-500 underline"
                    >
                      view →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>No data to display</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* <table className="md:hidden table text-left overflow-x-scroll w-full text-nowrap mobiletable">
          <caption className="text-2xl font-semibold text-center mb-6 text-slate-400"></caption>
          <thead className="text-sm">
            <tr className="bg-slate-300">
              <th className="px-2">Po</th>
              <th className="py-4">Team</th>
              <th className="p-2">P</th>
              <th className="p-2">W</th>
              <th className="p-2">L</th>
              <th className="p-2">D</th>
              <th className="p-2">GD</th>
              <th className="p-2">Pts</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {teamData && teamData.length > 0 ? (
              teamData.map((teams, index) => (
                <tr key={teams.teamId} className="even:bg-gray-100 text-sm">
                  <td className="px-4">{index + 1}</td>
                  <td className="py-4 font-bold">{teams.title}</td>
                  <td className="p-2">{teams.gamesPlayed}</td>
                  <td className="p-2">{teams.gamesWon}</td>
                  <td className="p-2">{teams.gamesLost}</td>
                  <td className="p-2">{teams.gamesDrawn}</td>
                  <td className="p-2">{teams.goalDifference}</td>
                  <td className="p-2">{teams.points}</td>
                  <td className="p-2">
                    <Link
                      href={`/team/${teams.teamId}`}
                      className="text-sm text-blue-500 underline"
                    >
                      →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>No data to display</td>
              </tr>
            )}
          </tbody>
        </table> */}
      </div>
      <div className="tab2">
        <div className="mt-4">
          <label className="sr-only">Search players</label>
          <input
            type="search"
            name="searchplayers"
            id="searchplayers"
            placeholder="Search player name"
            className="border py-2 px-4 w-full rounded-xl"
            onChange={handleSearch}
          />
        </div>
        <table className=" text-left w-full">
          <caption className="text-2xl font-semibold text-center mb-6 text-slate-400"></caption>
          <thead className="bg-slate-300">
            <tr className="">
              <th className="p-2">No</th>
              <th className="p-2">Name</th>
              <th className="p-2">⚽️</th>
              <th className="p-2">🥾</th>
              <th className="p-2">🟨</th>
              <th className="p-2">🟥</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayerStats && currentPlayerStats.length > 0 ? (
              currentPlayerStats.map((player, index) => (
                <tr key={player.playerName} className="even:bg-gray-100 tablet-body">
                  <td className="p-2">{startIndexOfSN + index + 1}</td>
                  <td className="p-2">{player.playerName}</td>
                  <td className="p-2">{player.goal}</td>
                  <td className="p-2">{player.assist}</td>
                  <td className="p-2">{player.yellowCard}</td>
                  <td className="p-2">{player.redCard}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2">1</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center gap-4">
          {Array.from({ length: Math.ceil(playerData.length / playersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                paginate(i + 1);
              }}
              className={`mx-1 px-4 pagination py-2  rounded-lg ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-400 border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="icon_keys">
        <p>⚽️ - Goal</p>
        <p>🥾 - assist</p>
        <p>
          🟨 - yellow card <i className="text-sm text-slate-500">(NGN 200 fine)</i>
        </p>
        <p>
          🟥 - red card <i className="text-sm text-slate-500">(NGN 500 fine)</i>
        </p>
      </div>
    </div>
  );
};
