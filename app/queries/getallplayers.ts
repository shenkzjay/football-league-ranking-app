import { playerTable } from "../db/schema";
import { db } from "../db";

export async function getAllPlayers() {
  try {
    const players = await db.select().from(playerTable);

    return players;
  } catch (error) {
    throw error;
  }
}
