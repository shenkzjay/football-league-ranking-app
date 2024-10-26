"use server";

import { db } from "@/app/db";
import { playerTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function updatePlayerData(playerId: number, formData: FormData) {
  try {
    const updatePlayerDetails = {
      playerName: formData.get("playername") as string,
      goal: Number(formData.get("goal")),
      assist: Number(formData.get("assist")),
      yellowCard: Number(formData.get("yellowCard")),
      redCard: Number(formData.get("redCard")),
    };

    console.log({ updatePlayerDetails, playerId });

    const result = await db
      .update(playerTable)
      .set(updatePlayerDetails)
      .where(eq(playerTable.id, playerId))
      .returning();

    if (!result) {
      throw new Error("Failed to update team or team not found");
    }

    return {
      message: `Player ${updatePlayerDetails.playerName} records has been updated`,
    };
  } catch (error) {
    return {
      message: "Error updating team: " + (error instanceof Error ? error.message : String(error)),
    };
  }
}
