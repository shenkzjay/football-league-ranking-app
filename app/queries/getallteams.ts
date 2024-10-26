import { teamsTable, scoresTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getAllTeams = unstable_cache(
  async () => {
    try {
      const teams = await db
        .select({
          teamId: teamsTable.id,
          title: teamsTable.title,
          teamColor: teamsTable.teamColor,
          players: teamsTable.players,
          scoreId: teamsTable.scoreId,
          gamesPlayed: scoresTable.gamesPlayed,
          gamesWon: scoresTable.gamesWon,
          gamesLost: scoresTable.gamesLost,
          gamesDrawn: scoresTable.gamesDrawn,
          goalFor: scoresTable.goalFor,
          goalAgainst: scoresTable.goalAgainst,
          goalDifference: scoresTable.goalDifference,
          points: scoresTable.points,
          form: scoresTable.form,
          createdAt: scoresTable.createdAt,
          updatedAt: scoresTable.updatedAt,
        })
        .from(teamsTable)
        .innerJoin(scoresTable, eq(teamsTable.scoreId, scoresTable.id));

      return teams;
    } catch (error) {
      console.log(error);
    }
  },
  ["all-teams"],
  {
    tags: ["teams"],
  }
);
