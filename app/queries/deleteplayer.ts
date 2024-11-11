import { revalidateTag } from "next/cache";
import { db } from "../db";
import { playerTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function DeletePlayers(playerId: number) {
  //check if player exist
  try {
    const existingPlayer = await db.select().from(playerTable).where(eq(playerTable.id, playerId));

    if (!existingPlayer) {
      return {
        message: "No existing player",
      };
    }

    await db.delete(playerTable).where(eq(playerTable.id, playerId));

    revalidateTag("players");

    return {
      message: "Player succesfully deleted",
    };
  } catch (error) {
    return {
      message: "Failed to delete player " + error,
    };
  }
}
