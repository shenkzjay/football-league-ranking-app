import { getAllTeams } from "@/app/queries/getallteams";
import { getAllPlayers } from "./queries/getallplayers";
// import Link from "next/link";
// import { Fixtures } from "@/ui-components/fixtures";
import { TeamStanding } from "@/ui-components/teamStandings";
import { TeamDetails } from "@/types/team";
import { FixtureCard } from "@/ui-components/fixturecard";
import { Fixtures } from "@/ui-components/fixtures";
import { Player } from "@/types/player";
import { Arsenal } from "@/public/svg/arsenal";
import { Chelsea } from "@/public/svg/chelsea";
import { ManU } from "@/public/svg/manU";
// import { RealMadrid } from "@/public/svg/realmadrid";
import { Barca } from "@/public/svg/barca";

export default async function Home() {
  const data = await getAllTeams();

  const players = await getAllPlayers();

  const playerData: Player[] =
    players?.sort((a, b) => {
      //sort goal in descending order
      if (b.goal !== a.goal) {
        return b.goal - a.goal;
      }

      //if goals are equal, sort by assist in decending order
      if (b.assist !== a.assist) {
        return b.assist - a.assist;
      }

      //if goals and assist are equal, sort by yellowcard in descending order
      if (b.yellowCard !== a.yellowCard) {
        return b.yellowCard - a.yellowCard;
      }

      //if goals, assists and yellowcard are equal, sort by redCard in descending order
      if (b.redCard !== a.redCard) {
        return b.redCard - a.redCard;
      }

      // Push players with zero stats to the bottom
      const aHasStats = a.goal || a.assist || a.yellowCard || a.redCard;
      const bHasStats = b.goal || b.assist || b.yellowCard || b.redCard;

      return bHasStats - aHasStats;
    }) ?? [];

  //@ts-expect-error type error expecting the values of teamData to be undefined
  const teamData: TeamDetails[] =
    data?.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }

      if (b.goalFor !== a.goalFor) {
        return b.goalFor - a.goalFor;
      }

      return a.title.localeCompare(b.title);
    }) ?? [];

  // const handleTableRowClick = (teamId: number) => {
  //   router.push(`/team/${teamId}`);
  // };

  return (
    <section>
      <div className="">
        <header className="relative">
          <div className="bannerbg">
            <video autoPlay muted loop className=" w-full h-full object-cover" src="/vid/cloud.mp4">
              <source src="/vid/cloud.mp4" type="video"></source>
            </video>
            <div className="w-full h-full bg-black/50 absolute top-0"></div>
            <div className="absolute top-0 text-3xl font-extrabold flex flex-col justify-center h-full md:w-[80vw] md:mx-auto  mx-6">
              <span className="flex flex-col md:gap-10 z-10 text-white" id="titleEffects">
                <p>Man Utd beats Chelsea ⚽️</p>
                {/* <p className="">Unity league cup</p> */}
              </span>{" "}
              <ul className="font-normal text-white text-base z-20  mt-10 md:w-1/2 flex flex-col gap-6">
                <li className="">
                  In a thrilling encounter, Man Utd edged out their rivals, with{" "}
                  <i className="font-bold">Engr. Segun&apos;s</i> &nbsp; decisive goal securing
                  their position at the top of the league.
                </li>
                <li>
                  Barcelona and Arsenal locked horns in a battle of titans, but the match ended in a
                  frustrating goalless draw.
                </li>
              </ul>
              <div className="item"></div>
            </div>
          </div>
        </header>

        <section className="mt-12 md:mx-auto md:w-[80vw] mx-4">
          <h2 className="text-2xl font-semibold mb-6 text-slate-500">Fixtures</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 border md:p-6 p-0 rounded-xl">
            <div className=" flex items-center p-10 gap-4 border rounded-xl bg-[#e4e4e4]">
              <FixtureCard
                home="BARCELONA"
                away="ARSENAL"
                time="7:20am"
                outlineHomeColor="outline-red-500"
                bgHomeColor="bg-red-500"
                outlineAwayColor="outline-blue-500"
                bgAwayColor="bg-blue-500"
                homeIcon={<Barca />}
                awayIcon={<Arsenal />}
              />
            </div>

            <div className=" flex items-center p-10 gap-4 border rounded-xl bg-[#e4e4e4]">
              <FixtureCard
                home="CHELSEA"
                away="MAN-UTD"
                time="8:00am"
                outlineHomeColor="outline-white"
                bgHomeColor="bg-white"
                outlineAwayColor="outline-red-500"
                bgAwayColor="bg-red-500"
                homeIcon={<Chelsea />}
                awayIcon={<ManU />}
              />
            </div>
          </div>
        </section>

        <section className="md:mx-auto md:w-[80vw]  mx-6 my-24">
          <h3 className="text-2xl font-semibold  mb-6 text-slate-500">Scores update</h3>
          <div className="overflow-x-auto">
            <Fixtures />
          </div>
        </section>

        <section className=" mt-12 md:mx-auto md:w-[80vw] tabletSection">
          <div className="flex relative w-full">
            <input type="radio" name="tabs" id="radio-1" defaultChecked />
            <label className="" htmlFor="radio-1">
              League standing
            </label>
            <input type="radio" name="tabs" id="radio-2" />
            <label className="tabs" htmlFor="radio-2">
              Player statistics
            </label>
            <span className="glider"></span>
            <TeamStanding teamData={teamData} playerData={playerData} />
          </div>
        </section>

        <div className="icon_keys my-20 mx-auto w-[80vw] pt-24">
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
      {/* <footer className="block mx-auto w-[80vw]  text-center text-slate-400 mt-72 mb-20">
        &copy;&nbsp;Copyright 2024 city football league - designed with ❤️ by - Seun
      </footer> */}
    </section>
  );
}
