import { getAllTeams } from "@/app/queries/getallteams";
import { getAllPlayers } from "./queries/getallplayers";
// import Link from "next/link";
// import { Fixtures } from "@/ui-components/fixtures";
import { TeamStanding } from "@/ui-components/teamStandings";
import { TeamDetails } from "@/types/team";
import { FixtureCard } from "@/ui-components/fixturecard";

export default async function Home() {
  const data = await getAllTeams();

  const players = await getAllPlayers();

  const playerData = players?.sort((a, b) => b.goal - a.goal) ?? [];

  //@ts-expect-error type error expecting the values of teamData to be undefined
  const teamData: TeamDetails[] = data?.sort((a, b) => b.points - a.points) ?? [];

  // const handleTableRowClick = (teamId: number) => {
  //   router.push(`/team/${teamId}`);
  // };

  return (
    <section>
      <div className="">
        <header className="relative">
          <div className="bannerbg rounded-xl">
            <div className="w-full h-full bg-black/50 absolute top-0"></div>
            <div className="text-3xl font-extrabold flex flex-col justify-center h-full md:w-[80vw] md:mx-auto  mx-6">
              <span className="flex flex-col md:gap-10 z-10 text-white" id="titleEffects">
                <p>City United FC</p>
                <p className="">Unity league cup</p>
              </span>{" "}
              <p className="text-white text-base z-20 relative mt-6">
                Get live scores update of thrilling soccer games <br />
                happening live in the arena of dreams!
              </p>
              <div className="item"></div>
            </div>
          </div>
        </header>

        <section className="mt-12 md:mx-auto md:w-[80vw] mx-4">
          <h2 className="text-2xl font-semibold  mb-6 text-slate-500">Fixtures</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 border md:p-6 p-0 rounded-xl">
            <div className=" flex items-center p-10 gap-4 border rounded-xl bg-[#e4e4e4]">
              <FixtureCard
                home="ARSENAL"
                away="CHELSEA"
                time="7:20am"
                outlineHomeColor="outline-red-500"
                bgHomeColor="bg-red-500"
                outlineAwayColor="outline-blue-500"
                bgAwayColor="bg-blue-500"
              />
            </div>

            <div className=" flex items-center p-10 gap-4 border rounded-xl bg-[#e4e4e4]">
              <FixtureCard
                home="REAL-MADRID"
                away="MAN-UTD"
                time="7:20am"
                outlineHomeColor="outline-white"
                bgHomeColor="bg-white"
                outlineAwayColor="outline-red-500"
                bgAwayColor="bg-red-500"
              />
            </div>
          </div>
        </section>

        <section className=" mt-12 md:mx-auto md:w-[80vw] h-[55vh]  tabletSection">
          <div className="flex relative w-full">
            <input type="radio" name="tabs" id="radio-1" defaultChecked />
            <label className="" htmlFor="radio-1">
              League standing
            </label>
            <input type="radio" name="tabs" id="radio-2" />
            <label className="tabs" htmlFor="radio-2">
              Players statistic
            </label>
            <span className="glider"></span>
            <TeamStanding teamData={teamData} playerData={playerData} />
          </div>
        </section>
      </div>
      {/* <footer className="block mx-auto w-[80vw]  text-center text-slate-400 mt-72 mb-20">
        &copy;&nbsp;Copyright 2024 city football league - designed with ❤️ by - Seun
      </footer> */}
    </section>
  );
}
