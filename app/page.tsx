"use client";

import Image from "next/image";
import soccer from "@/public/imgs/soccer.png";
import { getAllTeams } from "@/app/queries/getallteams";
import { TeamDetails } from "@/types/team";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const fixturesData = [
    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "Team A",
      awayTeam: "Team B",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "Team C",
      awayTeam: "Team D",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "Team A",
      awayTeam: "Team C",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "Team B",
      awayTeam: "Team C",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "Team A",
      awayTeam: "Team D",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "Team B",
      awayTeam: "Team D",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "Team B",
      awayTeam: "Team D",
    },
  ];

  const { data, isError, isLoading } = getAllTeams();

  const teamData: TeamDetails[] = data;

  console.log({ data });

  const router = useRouter();

  const handleTableRowClick = (teamId: number) => {
    router.push(`/team/${teamId}`);
  };

  return (
    <section>
      <div className="mx-auto w-[80vw]">
        <nav>
          <h1>City Footbal League Standings</h1>
        </nav>
        <header className="relative">
          <div className="bannerbg w-full h-full rounded-xl">
            <div className="text-3xl font-extrabold flex flex-col justify-center h-full pl-12">
              <span className="absolute top-[25%] z-10" id="titleEffects">
                <p>City Club</p>
                <p>League Pro</p>
              </span>
              <div className="item top w-full h-full">
                <div className="stars">★</div>
              </div>
              <div className="item"></div>
            </div>
          </div>
          <div className="absolute top-0 right-0">
            <Image
              src={soccer}
              width={300}
              height={300}
              alt="illustration of a man striking a football"
            />
          </div>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-slate-400">Fixtures</h2>
          <div className="flex flex-row  gap-6 w-full overflow-auto ">
            <button className="sticky left-0 right-0 bg-white px-2 shadow-[0px_8px_20px_14px_rgba(0,0,0,0.08)]">
              ←
            </button>
            <div className="flex flex-row gap-6">
              {fixturesData.map((fixtures, index) => (
                <button
                  key={index}
                  className="w-[20vw] bg-[#f5f5f5] p-4 rounded-xl gap-2 flex flex-col"
                >
                  <div className="flex w-full flex-row justify-between text-sm text-slate-500">
                    <p>{fixtures.fixtureTitle}</p>
                    <p>{fixtures.fixtureDate}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full "></span>
                      <h4>{fixtures.homeTeam}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                      <h4>{fixtures.awayTeam}</h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button className="sticky left-0 right-0 bg-white px-2 shadow-[0px_8px_20px_14px_rgba(0,0,0,0.08)]">
              →
            </button>
          </div>
        </section>

        <section className="mt-12">
          <table className="w-full text-left">
            <caption className="text-2xl font-semibold text-center mb-6 text-slate-400">
              League standings
            </caption>
            <thead className="">
              <tr className="bg-slate-100">
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>L</th>
                <th>D</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {teamData && teamData.length > 0 ? (
                teamData.map((teams, index) => (
                  <tr
                    key={teams.teamId}
                    onClick={() => handleTableRowClick(teams.teamId)}
                    className="cursor-pointer"
                  >
                    <td>{index + 1}</td>
                    <td>{teams.title}</td>
                    <td>{teams.gamesPlayed}</td>
                    <td>{teams.gamesWon}</td>
                    <td>{teams.gamesLost}</td>
                    <td>{teams.gamesDrawn}</td>
                    <td>{teams.goalFor}</td>
                    <td>{teams.goalAgainst}</td>
                    <td>{teams.goalDifference}</td>
                    <td>{teams.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10}>No data to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
}
