import Link from "next/link";

export const SideMenu = () => {
  return (
    <nav className="flex flex-col gap-4 m-6">
      <Link href={"/admin/player"}>Players</Link>
      <Link href={"/admin/team"}>Teams</Link>
      <Link href={"/admin/score"}>Scores update</Link>
    </nav>
  );
};
