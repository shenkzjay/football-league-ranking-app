import { getAllTeams } from "@/app/queries/getallteams";
import { getAllPlayers } from "./queries/getallplayers";
import Link from "next/link";
import { Fixtures } from "@/ui-components/fixtures";
import { TeamStanding } from "@/ui-components/teamStandings";
import { TeamDetails } from "@/types/team";

export default async function Home() {
  const data = await getAllTeams();

  const players = await getAllPlayers();

  const playerData = players.sort((a, b) => b.goal - a.goal);

  const teamData = data?.sort((a, b) => b.points - a.points);

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
                <p>City Football Club</p>
                <p>Mini League</p>
              </span>{" "}
              <p className="text-white text-base z-20 relative mt-6">
                Get live scores update of thrilling soccer games <br />
                happening live in the arena of dreams!
              </p>
              {/* <div className="item top w-full h-full absolute top-0">
                <div className="stars">★</div>
              </div> */}
              <div className="item"></div>
            </div>
          </div>
          {/* <div className="absolute top-0 right-0">
            <Image
              src={soccer}
              width={300}
              height={300}
              alt="illustration of a man striking a football"
            />
          </div> */}
        </header>

        <section className="mt-12 md:mx-auto md:w-[80vw] mx-4">
          <h2 className="text-2xl font-semibold  mb-6 text-slate-500">Fixtures</h2>
          <div className="flex flex-row gap-6  ">
            <Fixtures />
          </div>
        </section>

        <section className="relative mt-12 mx-auto md:w-[80vw] mb-20 h-[45vh]">
          <div className="flex relative mb-20">
            <input type="radio" name="tabs" id="radio-1" defaultChecked />
            <label className="tabs" htmlFor="radio-1">
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
