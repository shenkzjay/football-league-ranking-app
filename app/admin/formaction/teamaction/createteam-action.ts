"use server";
import { db } from "@/app/db";
import { teamsTable, scoresTable, InsertTeam } from "@/app/db/schema";
import { revalidateTag } from "next/cache";

export async function createTeam(prevState: unknown, formData: FormData) {
  try {
    const teamNameJSON = formData.get("teamname") as string;
    const selectedItemsJson = formData.get("selectedItems") as string;
    const teamColorJSON = formData.get("teamColor") as string;

    const teamName = teamNameJSON.toUpperCase();

    const teamColor = JSON.parse(teamColorJSON);

    const selectedItems = JSON.parse(selectedItemsJson);

    if (!Array.isArray(selectedItems)) {
      return {
        message: "Selected items must be an array",
      };
    }

    const scores = {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      gamesDrawn: 0,
      goalFor: 0,
      goalAgainst: 0,
      goalDifference: 0,
      points: 0,
      form: "N/A",
    };

    const [newScore] = await db
      .insert(scoresTable)
      .values(scores)
      .returning({ id: scoresTable.id });

    if (!newScore) {
      return {
        message: "Failed to insert score",
      };
    }

    const teamDetails: InsertTeam = {
      title: teamName,
      players: selectedItems,
      scoreId: newScore.id,
      teamColor,
    };

    console.log({ teamDetails });

    await db.insert(teamsTable).values(teamDetails);

    revalidateTag("teams");
    revalidateTag("players");
    revalidateTag("singleteam");

    return { message: `${teamDetails.title} created successfully` };
  } catch (error) {
    return {
      message: "Error creating team: " + (error instanceof Error ? error.message : String(error)),
    };
  }
}
