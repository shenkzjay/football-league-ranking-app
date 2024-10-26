import { getAllPlayers } from "@/app/queries/getallplayers";
import { Player } from "@/types/player";
import Link from "next/link";

export async function ListPlayers() {
  const players = await getAllPlayers();

  const playerData: Player[] = players ?? [];

  return (
    <section className="bg-white w-full p-6 rounded-xl h-screen">
      <div className="my-10 space-x-6">
        <Link
          href={"/admin/player/addplayer"}
          className="py-2 mt-4 px-4 bg-black rounded-xl text-white"
        >
          Add players
        </Link>

        <Link
          href={"/admin/player/updateplayer"}
          className="py-2 mt-4 px-4 border-black border-2 rounded-xl text-black"
        >
          Update players stats
        </Link>
      </div>
      <h2>List of Players</h2>
      <div className=" h-[30vw] overflow-auto">
        <table className="w-full text-left ">
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
              playerData.map((player) => (
                <tr key={player.playerName}>
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
      </div>
    </section>
  );
}
