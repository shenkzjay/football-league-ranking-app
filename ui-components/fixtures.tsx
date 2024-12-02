import { CSSProperties } from "react";

export const Fixtures = () => {
  const fixturesData = [
    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "ARSENAL",
      awayTeam: "CHELSEA",
      homeTeamScores: "1",
      awayTeamScores: "1",
      matchDate: "27/10/2024",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "BARCELONA",
      awayTeam: "MAN-UTD",
      homeTeamScores: "0",
      awayTeamScores: "0",
      matchDate: "27/10/2024",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "BARCELONA",
      awayTeam: "ARSENAL",
      matchDate: "03/11/2024",
      homeTeamScores: "0",
      awayTeamScores: "0",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "CHELSEA",
      awayTeam: "MAN-UTD",
      matchDate: "03/11/2024",
      homeTeamScores: "0",
      awayTeamScores: "1",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "MAN-UTD",
      awayTeam: "ARSENAL",
      matchDate: "11/10/24",
      homeTeamScores: "0",
      awayTeamScores: "0",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "CHELSEA",
      awayTeam: "BARCELONA",
      matchDate: "11/10/-24",
      homeTeamScores: "2",
      awayTeamScores: "0",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "MAN-UTD",
      awayTeam: "ARSENAL",
      matchDate: "17/10/24",
      homeTeamScores: "2",
      awayTeamScores: "0",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "CHELSEA",
      awayTeam: "BARCELONA",
      matchDate: "17/11/24",
      homeTeamScores: "2",
      awayTeamScores: "1",
    },
    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "MAN-U",
      awayTeam: "CHELSEA",
      matchDate: "24/11/24",
      homeTeamScores: "1",
      awayTeamScores: "1",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "BARCELONA",
      awayTeam: "ARSENAL",
      matchDate: "24/11/24",
      homeTeamScores: "3",
      awayTeamScores: "0",
    },
    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "MAN-U",
      awayTeam: "BARCELONA",
      matchDate: "1/12/24",
      homeTeamScores: "0",
      awayTeamScores: "0",
    },

    {
      fixtureTitle: "City league",
      fixtureDate: "Sunday 14 Oct, 2024",
      fixtureTime: "7:00am",
      homeTeam: "CHELSEA",
      awayTeam: "ARSENAL",
      matchDate: "1/12/24",
      homeTeamScores: "0",
      awayTeamScores: "0",
    },
  ];

  return (
    <div className="flex w-full gap-4 fixCard">
      {fixturesData.map((fixtures, index) => {
        const isHighlighted = index < 12;
        return (
          <button
            key={index}
            style={{ "--c": index + 1 } as CSSProperties}
            className={` child text-nowrap  ${
              isHighlighted ? "w-full bg-[#f5f5f5]" : "w-full bg-black"
            } p-4 rounded-xl gap-2 flex flex-col bg-[#262626] w-full`}
          >
            <div
              className={`flex w-full flex-row justify-between text-sm gap-10 ${
                isHighlighted ? "text-black" : "text-white"
              } `}
            >
              {/* <p className="text-nowrap">{fixtures.fixtureTitle}</p> */}
              {/* <p className="text-nowrap">{fixtures.fixtureDate}</p> */}
            </div>
            <div
              className={`flex flex-row justify-between w-full ${
                isHighlighted ? "text-black" : "text-white"
              }`}
            >
              <div className="flex flex-col gap-2 updateScoretxt text-left ">
                <div className="text-xs text-slate-500">{fixtures.matchDate}</div>
                <div className="flex items-center ">
                  <h4>{fixtures.homeTeam}</h4>
                </div>
                <div className="flex items-center ">
                  <h4>{fixtures.awayTeam}</h4>
                </div>
              </div>

              <div className="font-bold flex flex-col gap-2 updateScores">
                <div className="text-xs mb-4"></div>
                <p>{fixtures.homeTeamScores ?? "-"}</p>
                <p>{fixtures.awayTeamScores ?? "-"}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
