type FixtureCardType = {
  home: string;
  away: string;
  time: string;
  outlineHomeColor?: string;
  bgHomeColor?: string;
  outlineAwayColor?: string;
  bgAwayColor?: string;
  homeIcon: React.ReactNode;
  awayIcon: React.ReactNode;
};

export const FixtureCard = ({
  home,
  away,
  time,
  outlineHomeColor,
  bgHomeColor,
  outlineAwayColor,
  bgAwayColor,
  homeIcon,
  awayIcon,
}: FixtureCardType) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-center text-slate-500">
        {/* {new Date(Date.now()).toLocaleString("en-Gb", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })} */}
        03/11/2024
      </p>
      <div className="[font-size:clamp(.5rem,2vw,1rem)] flex flex-row justify-between items-center fixtureCard">
        <div className={`flex w-[4em] h-[4em] rounded-xl overflow-hidden `}>{homeIcon}</div>
        <div className="text-center font-bold">
          <p>{home}</p>
          <p className="text-xs">vs</p>
          <p>{away}</p>
        </div>
        <div className={`w-[4em] h-[4em] rounded-xl overflow-hidden `}>{awayIcon}</div>
      </div>
      <p className="text-center text-slate-500">{time}</p>
    </div>
  );
};
