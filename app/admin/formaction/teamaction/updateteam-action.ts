"use server";

import { teamsTable } from "@/app/db/schema";
import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function updateTeam(teamId: number, formData: FormData) {
  try {
    const teamNameJSON = formData.get("teamname") as string;
    const selectedItemsJson = formData.get("selectedItems") as string;
    const teamColorJSON = formData.get("teamColor") as string;

    const teamName = teamNameJSON.toUpperCase();

    const teamColor = JSON.parse(teamColorJSON);

    const selectedItems = JSON.parse(selectedItemsJson);

    if (!Array.isArray(selectedItems)) {
      throw new Error("Selected items must be an array");
    }

    const updateTeamDetails = {
      title: teamName,
      players: selectedItems,
      teamColor,
    };

    const [result] = await db
      .update(teamsTable)
      .set(updateTeamDetails)
      .where(eq(teamsTable.id, teamId))
      .returning();

    if (!result) {
      throw new Error("Failed to update team or team not found");
    }

    revalidateTag("teams");
    revalidateTag("singleteam");

    return { message: `${updateTeamDetails.title} updated successfully` };
  } catch (error) {
    return {
      message: "Error updating team: " + (error instanceof Error ? error.message : String(error)),
    };
  }
}
