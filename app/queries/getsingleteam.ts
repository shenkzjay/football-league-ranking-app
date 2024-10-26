import { db } from "../db";
import { unstable_cache } from "next/cache";

export const getSingleTeam = (teamId: number) => {
  return unstable_cache(
    async () => {
      try {
        const singleTeam = await db.query.teamsTable.findFirst({
          where: (teamsTable, { eq }) => eq(teamsTable.id, teamId),
        });

        return singleTeam;
      } catch (error) {
        throw error;
      }
    },
    ["single-team", teamId.toString()],
    { tags: ["singleteam"] }
  )();
};
