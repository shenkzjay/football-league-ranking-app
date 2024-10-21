"use server";

import { db } from "@/app/db";

import { InsertScore, scoresTable, teamsTable } from "@/app/db/schema";

import { eq } from "drizzle-orm";

export async function createScores(prevState: any, formData: FormData) {
  const scoreDetails = {
    homeTeamName: formData.get("hometeam") as string,
    awayTeamName: formData.get("awayteam") as string,
    homeScore: Number(formData.get("homescores")),
    awayScore: Number(formData.get("awayscores")),
  };

  //

  const homeTeam = await db
    .select()
    .from(teamsTable)
    .where(eq(teamsTable.title, scoreDetails.homeTeamName));

  const awayTeam = await db
    .select()
    .from(teamsTable)
    .where(eq(teamsTable.title, scoreDetails.awayTeamName));

  if (!homeTeam || !awayTeam) {
    throw new Error("Team not found");
  }

  return {
    message: "",
  };
}
