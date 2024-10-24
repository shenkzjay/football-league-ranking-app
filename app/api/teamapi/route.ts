import { db } from "@/app/db";
import { teamsTable, scoresTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
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

    return Response.json(teams, { status: 200 });
  } catch (error) {
    return Response.json({ error: `failed to fetch teams: ${error}` }, { status: 500 });
  }
}
