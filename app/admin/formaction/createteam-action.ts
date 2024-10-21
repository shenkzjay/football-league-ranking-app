"use server";
import { db } from "@/app/db";
import { InsertPlayer, teamsTable, scoresTable, InsertTeam } from "@/app/db/schema";

export async function createTeam(prevState: any, formData: FormData) {
  try {
    const teamName = formData.get("teamname") as string;
    const selectedItemsJson = formData.get("selectedItems") as string;
    const teamColorJSON = formData.get("teamColor") as string;

    const teamColor = JSON.parse(teamColorJSON);

    const selectedItems = JSON.parse(selectedItemsJson);

    if (!Array.isArray(selectedItems)) {
      throw new Error("Selected items must be an array");
    }

    const scores = {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
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
      throw new Error("Failed to insert score");
    }

    const teamDetails: InsertTeam = {
      title: teamName,
      players: selectedItems,
      scoreId: newScore.id,
      teamColor,
    };

    console.log({ teamDetails });

    await db.insert(teamsTable).values(teamDetails);

    return { message: "Team created successfully" };
  } catch (error) {
    return {
      message: "Error creating team: " + (error instanceof Error ? error.message : String(error)),
    };
  }
}
