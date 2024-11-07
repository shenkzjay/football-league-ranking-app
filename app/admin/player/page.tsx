import { CreatePlayers } from "./addplayer/createPlayers";
export const dynamic = "force-dynamic";

export default function Players() {
  return (
    <>
      <section className="">
        <CreatePlayers />
      </section>
    </>
  );
}
