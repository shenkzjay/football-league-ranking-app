"use server";

import { db } from "@/app/db";
import { playerTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function updatePlayerData(playerId: number, formData: FormData) {
  try {
    const updatePlayerDetails = {
      playerName: formData.get("playername") as string,
      goal: Number(formData.get("goal")) || 0,
      assist: Number(formData.get("assist")) || 0,
      yellowCard: Number(formData.get("yellowCard")) || 0,
      redCard: Number(formData.get("redCard")) || 0,
    };

    const existingPlayerDetails = await db
      .select({
        goal: playerTable.goal,
        assist: playerTable.assist,
        yellowCard: playerTable.yellowCard,
        redCard: playerTable.redCard,
      })
      .from(playerTable)
      .where(eq(playerTable.id, playerId))
      .then((rows) => rows[0]);

    if (!existingPlayerDetails) {
      throw new Error("Player not found");
    }

    const result = await db
      .update(playerTable)
      .set({
        playerName: updatePlayerDetails.playerName,
        goal: existingPlayerDetails.goal + updatePlayerDetails.goal,
        assist: existingPlayerDetails.assist + updatePlayerDetails.assist,
        yellowCard: existingPlayerDetails.yellowCard + updatePlayerDetails.yellowCard,
        redCard: existingPlayerDetails.redCard + updatePlayerDetails.redCard,
      })
      .where(eq(playerTable.id, playerId))
      .returning();

    // const result = await db
    //   .update(playerTable)
    //   .set(updatePlayerDetails)
    //   .where(eq(playerTable.id, playerId))
    //   .returning();

    if (!result) {
      throw new Error("Failed to update team or team not found");
    }

    revalidateTag("players");

    return {
      message: `Player ${updatePlayerDetails.playerName} records has been updated`,
    };
  } catch (error) {
    return {
      message: "Error updating team: " + (error instanceof Error ? error.message : String(error)),
    };
  }
}
