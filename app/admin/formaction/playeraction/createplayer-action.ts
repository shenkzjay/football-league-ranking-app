"use server";
import { db } from "@/app/db";
import { playerTable } from "@/app/db/schema";
import { redirect } from "next/navigation";

export async function createPlayer(prevState: unknown, formData: FormData) {
  try {
    const playerDetails = {
      playerName: formData.get("playername") as string,
      goal: Number(formData.get("goal")),
      assist: Number(formData.get("assist")),
      yellowCard: Number(formData.get("yellowCard")),
      redCard: Number(formData.get("redCard")),
    };

    const result = await db.insert(playerTable).values(playerDetails);

    if (result.rowCount === 1) {
      return {
        message: `Player ${playerDetails.playerName} has been successfully created`,
      };
    }
  } catch (error) {
    return {
      message: "Error creating team: " + (error instanceof Error ? error.message : String(error)),
    };
  }

  redirect("/admin/player");
}
