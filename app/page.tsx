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

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomSpeed = () => {
    return Math.random() * 10 + 5; // Speed between 2s and 5s
  };
  const generateRandomPosition = () => Math.random() * 90; // Position between 0% and 100%

  const balloons = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    color: generateRandomColor(),
    speed: generateRandomSpeed(),
    position: generateRandomPosition(),
  }));

  return (
    <section>
      <div className=" backbg">
        <header className="relative h-full">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className="balloon-container"
              style={{
                animationDuration: `${balloon.speed}s`,
                left: `${balloon.position}%`,
              }}
            >
              <div
                className="balloon"
                style={{
                  backgroundColor: balloon.color,
                }}
              />
              <div
                className="stem"
                style={{
                  borderColor: `transparent transparent ${balloon.color}  transparent`,
                }}
              />
            </div>
          ))}
          <div
            className="wrapper_bg
       w-full h-[100vh] absolute top-0"
          ></div>
          <div className="bannerb flex md:mx-auto md:w-[80vw] md:py-40 py-20 md:flex-row flex-col justify-between gap-20 mx-6">
            {/* <div className="w-full h-full bg-black/40 absolute top-0"></div> */}
            <div className="text-3xl font-extrabold flex flex-col justify-center h-full md:w-[80vw] md:mx-auto text-white">
              <span className="flex flex-col md:gap-10 z-10 md:text-6xl text-3xl text-wrap">
                <p>Jagaban too hot for Arsenal!</p>
              </span>{" "}
              <ul className="font-normal text-base z-20  mt-6 md:w-2/3 flex flex-col gap-5">
                <li className="">
                  <i className="font-bold">Jagaban - The Birthday Boy</i> 🎉🥳🎉 - scored a brace to
                  dent Arsenal&apos;s hope of ending their winless run.
                </li>
                <li>
                  In the other game, both teams shared points as a goal from{" "}
                  <i className="font-bold">Senior man</i> cancelled out{" "}
                  <i className="font-bold">Gbolahan&apos;s</i> initial effort in what was a
                  pulsating encounter.
                </li>
              </ul>
              <div className="item"></div>
            </div>
            <div className="w-full">
              <video
                autoPlay
                muted
                loop
                className="!z-10   relative w-full md:h-full h-[30vh] object-cover rounded-xl"
                src="/vid/telegram2.mp4"
              >
                <source src="/vid/cloud.mp4" type="video"></source>
              </video>
            </div>
          </div>
        </header>
        <div className="z-10 relative bg-white md:rounded-tl-[10rem] rounded-tl-[3rem] rounded-tr-[3rem] md:rounded-tr-[10rem]">
          <section className="">
            <div className="pt-24 md:mx-auto md:w-[80vw] mx-4">
              <h2 className="text-2xl font-semibold mb-6 text-slate-500">Fixtures</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 border md:p-6 p-0 rounded-xl">
                <div className=" flex items-center p-10 gap-4 border rounded-xl bg-[#e4e4e4]">
                  <FixtureCard
                    home="MAN-UTD"
                    away="CHELSEA"
                    time="7:20am"
                    outlineHomeColor="outline-red-500"
                    bgHomeColor="bg-red-500"
                    outlineAwayColor="outline-blue-500"
                    bgAwayColor="bg-blue-500"
                    homeIcon={<ManU />}
                    awayIcon={<Chelsea />}
                  />
                </div>

                <div className=" flex items-center p-10 gap-4 border rounded-xl bg-[#e4e4e4]">
                  <FixtureCard
                    home="ARSENAL"
                    away="BARCELONA "
                    time="8:00am"
                    outlineHomeColor="outline-white"
                    bgHomeColor="bg-white"
                    outlineAwayColor="outline-red-500"
                    bgAwayColor="bg-red-500"
                    homeIcon={<Arsenal />}
                    awayIcon={<Barca />}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="md:mx-auto md:w-[80vw]  mx-6 my-24">
            <h3 className="text-2xl font-semibold  mb-6 text-slate-500">Scores update</h3>
            <p className="text-slate-400 text-center mb-2 italic">← swipe to view more updates →</p>
            <div className="overflow-x-auto cardscroll ">
              <div className="fixcardscroll">
                <Fixtures />
              </div>
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
      </div>
      {/* <footer className="block mx-auto w-[80vw]  text-center text-slate-400 mt-72 mb-20">
        &copy;&nbsp;Copyright 2024 city football league - designed with ❤️ by - Seun
      </footer> */}
    </section>
  );
}
