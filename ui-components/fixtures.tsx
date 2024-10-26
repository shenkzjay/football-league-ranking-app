export const Fixtures = () => {
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

  return (
    <div className="flex flex-row gap-6 w-[100vw]">
      {fixturesData.map((fixtures, index) => (
        <button
          key={index}
          className={`md:w-[100vw] w-[70vw] child ${
            index === 0 ? "bg-[#f5f5f5]" : "bg-[#333333]"
          } p-4 rounded-xl gap-2 flex flex-col bg-[#262626]`}
        >
          <div
            className={`flex w-full flex-row justify-between text-sm ${
              index === 0 ? "text-black" : "text-white"
            } `}
          >
            <p>{fixtures.fixtureTitle}</p>
            <p>{fixtures.fixtureDate}</p>
          </div>
          <div className={`flex flex-col gap-2 ${index === 0 ? "text-black" : "text-black"}`}>
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
  );
};
