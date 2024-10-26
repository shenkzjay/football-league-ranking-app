type FixtureCardType = {
  home: string;
  away: string;
  time: string;
  outlineHomeColor?: string;
  bgHomeColor?: string;
  outlineAwayColor?: string;
  bgAwayColor?: string;
};

export const FixtureCard = ({
  home,
  away,
  time,
  outlineHomeColor,
  bgHomeColor,
  outlineAwayColor,
  bgAwayColor,
}: FixtureCardType) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-center text-slate-500">
        {new Date(Date.now()).toLocaleString("en-Gb", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <div className="[font-size:clamp(1rem,5vw,2rem)] flex flex-row justify-between items-center">
        <div
          className={`w-[4em] h-[4em] outline outline-2 ${outlineHomeColor} outline-offset-4 ${bgHomeColor} badge`}
        ></div>
        <div className="text-center font-bold">
          <p>{home}</p>
          <p className="text-xs">vs</p>
          <p>{away}</p>
        </div>
        <div
          className={`w-16 h-16 outline outline-2 ${outlineAwayColor} outline-offset-4 ${bgAwayColor} badge`}
        ></div>
      </div>
      <p className="text-center text-slate-500">{time}</p>
    </div>
  );
};
