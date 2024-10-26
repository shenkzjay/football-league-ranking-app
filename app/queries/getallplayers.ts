import { playerTable } from "../db/schema";
import { db } from "../db";
import { unstable_cache } from "next/cache";

export const getAllPlayers = unstable_cache(
  async () => {
    try {
      const players = await db.select().from(playerTable);

      return players;
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  },
  ["all-players"],
  { tags: ["players"] }
);
