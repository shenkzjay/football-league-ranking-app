import Link from "next/link";
import { SignOut } from "@/app/admin/auth/signOut";
import { Suspense } from "react";
import { InsertUser } from "@/app/db/schema";

interface UserProp {
  user: InsertUser;
}

export const SideMenu = ({ user }: UserProp) => {
  return (
    <nav className="flex flex-col gap-4 m-6">
      <p>Welcome, {user.username}</p>
      <Link href={"/admin/player"}>Players</Link>
      <Link href={"/admin/team"}>Teams</Link>
      <Link href={"/admin/score"}>Scores update</Link>

      <Suspense>
        <SignOut />
      </Suspense>
    </nav>
  );
};
