import { InsertPlayer, teamsTable, scoresTable } from "@/app/db/schema";
import { db } from "@/app/db";
import { eq } from "drizzle-orm";

export async function GET(request: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const id = (await params).id;

    console.log(id);

    const singleteam = await db
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
      .innerJoin(scoresTable, eq(teamsTable.scoreId, scoresTable.id))
      .where(eq(teamsTable.id, id));

    return Response.json(singleteam, { status: 200 });
  } catch (error) {
    return Response.json({ error: `failed to fetch singleteam: ${error}` }, { status: 500 });
  }
}
