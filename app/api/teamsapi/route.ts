import { db } from "@/app/db";
import { teamsTable } from "@/app/db/schema";

export async function GET(request: Request) {
  try {
    const teams = await db.select().from(teamsTable);

    return Response.json(teams, { status: 200 });
  } catch (error) {
    return Response.json({ error: `failed to fetch players: ${error}` }, { status: 200 });
  }
}
