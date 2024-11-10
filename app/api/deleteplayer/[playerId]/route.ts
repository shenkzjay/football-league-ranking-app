import { db } from "@/app/db";
import { playerTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request, { params }: { params: { playerId: string } }) {
  const player_Id = Number(params.playerId);

  if (!player_Id) {
    return Response.json({ error: "Player Id required" }, { status: 400 });
  }

  try {
    const result = await db.delete(playerTable).where(eq(playerTable.id, player_Id));

    if (result.rowCount === 0) {
      return Response.json({ message: "Player not found" }, { status: 400 });
    }

    return Response.json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
