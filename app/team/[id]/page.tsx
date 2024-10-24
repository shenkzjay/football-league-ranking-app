import { getSingleTeam } from "@/app/queries/getsingleteam";
import Link from "next/link";

export default async function Team({ params }: { params: { id: number } }) {
  const teamId = params.id;

  console.log({ teamId });

  const team = await getSingleTeam(teamId);

  console.log({ team });

  return (
    <section className="mx-auto w-[80vw]">
      <div>
        <div className="flex gap-6 items-center">
          <Link href="/">←</Link>
          <h3 className="my-4 font-bold text-xl">{team?.title}</h3>
        </div>
        <div className="[background-image:url('/imgs/pitch.avif')] bg-cover w-full h-[55vw]">
          {team?.players && team.players?.length > 0
            ? team.players.map((players, index) => (
                <div key={index} className="relative ">
                  <div
                    className={`style-${index + 1} flex item-center justify-center h-full`}
                    style={{ background: team.teamColor }}
                  >
                    <span className="flex items-center font-bold [font-size:clamp(.2em,2vw,1.5em)] text-nowrap">
                      {players}
                    </span>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div></div>
    </section>
  );
}
