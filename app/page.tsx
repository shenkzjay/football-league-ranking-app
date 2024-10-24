import { getAllTeams } from "@/app/queries/getallteams";
import Link from "next/link";

export default async function Home() {
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

  const data = await getAllTeams();

  const teamData = data;

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

        <section className="mt-12 md:mx-auto md:w-[80vw] mx-6">
          <h2 className="text-2xl font-semibold  mb-6 text-slate-500">Fixtures</h2>
          <div className="flex flex-row  gap-6 w-full overflow-auto ">
            {/* <button className="sticky left-0 right-0 bg-white px-2 shadow-[0px_8px_20px_14px_rgba(0,0,0,0.08)]">
              ←
            </button> */}
            <div className="flex flex-row gap-6">
              {fixturesData.map((fixtures, index) => (
                <button
                  key={index}
                  className={`md:w-[20vw] w-[70vw] ${
                    index === 0 ? "bg-[#f5f5f5]" : "bg-[#333333]"
                  } p-4 rounded-xl gap-2 flex flex-col`}
                >
                  <div
                    className={`flex w-full flex-row justify-between text-sm ${
                      index === 0 ? "text-black" : "text-white"
                    } `}
                  >
                    <p>{fixtures.fixtureTitle}</p>
                    <p>{fixtures.fixtureDate}</p>
                  </div>
                  <div
                    className={`flex flex-col gap-2 ${index === 0 ? "text-black" : "text-white"}`}
                  >
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
            {/* <button className="sticky left-0 right-0 bg-white px-2 shadow-[0px_8px_20px_14px_rgba(0,0,0,0.08)]">
              →
            </button> */}
          </div>
        </section>

        <section className="mt-12 mx-auto md:w-[80vw] mb-20 ">
          <h3 className="text-2xl font-semibold  mb-0 text-slate-500 mx-6 md:mx-0">
            League standing
          </h3>
          <div className="overflow-auto mx-6 md:mx-0">
            <table className=" text-left overflow-x-scroll w-full text-nowrap">
              <caption className="text-2xl font-semibold text-center mb-6 text-slate-400"></caption>
              <thead className="">
                <tr className="bg-slate-300">
                  <th className="p-4">Pos</th>
                  <th className="p-4">Team</th>
                  <th className="p-4">P</th>
                  <th className="p-4">W</th>
                  <th className="p-4">L</th>
                  <th className="p-4">D</th>
                  <th className="p-4">GF</th>
                  <th className="p-4">GA</th>
                  <th className="p-4">GD</th>
                  <th className="p-4">Pts</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {teamData && teamData.length > 0 ? (
                  teamData.map((teams, index) => (
                    <tr key={teams.teamId} className="even:bg-gray-100">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{teams.title}</td>
                      <td className="p-4">{teams.gamesPlayed}</td>
                      <td className="p-4">{teams.gamesWon}</td>
                      <td className="p-4">{teams.gamesLost}</td>
                      <td className="p-4">{teams.gamesDrawn}</td>
                      <td className="p-4">{teams.goalFor}</td>
                      <td className="p-4">{teams.goalAgainst}</td>
                      <td className="p-4">{teams.goalDifference}</td>
                      <td className="p-4">{teams.points}</td>
                      <td className="p-4">
                        <Link
                          href={`/team/${teams.teamId}`}
                          className="text-sm text-blue-500 underline"
                        >
                          View team →
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
          </div>
        </section>

        <footer className="mx-auto w-[80vw] flex justify-center text-slate-400 my-12">
          &copy;&nbsp;Copyright 2024 city football league - designed with ❤️ by - Seun
        </footer>
      </div>
    </section>
  );
}
