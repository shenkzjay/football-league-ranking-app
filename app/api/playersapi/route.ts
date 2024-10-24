import { db } from "@/app/db";
import { playerTable } from "@/app/db/schema";

export async function GET() {
  try {
    const players = await db.select().from(playerTable);

    return Response.json(players, { status: 200 });
  } catch (error) {
    return Response.json({ error: `failed to fetch players: ${error}` }, { status: 500 });
  }
}
