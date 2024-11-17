"use server";

import { db } from "@/app/db";

import { scoresTable, teamsTable } from "@/app/db/schema";

import { eq, ilike } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function createScores(prevState: unknown, formData: FormData) {
  const homeTeamName = formData.get("hometeam") as string;
  const awayTeamName = formData.get("awayteam") as string;
  const homeScore = Number(formData.get("homescores"));
  const awayScore = Number(formData.get("awayscores"));

  const scoreDetails = {
    homeTeamName,
    awayTeamName,
    homeScore,
    awayScore,
  };

  const homeTeam = await db
    .select()
    .from(teamsTable)
    .where(ilike(teamsTable.title, scoreDetails.homeTeamName));

  const awayTeam = await db
    .select()
    .from(teamsTable)
    .where(ilike(teamsTable.title, scoreDetails.awayTeamName));

  if (!homeTeam.length || !awayTeam.length) {
    return {
      message: "Team not found",
    };
  }

  const homeTeamId = homeTeam[0].id;
  const awayTeamId = awayTeam[0].id;

  const homeScoreRecord = await db.select().from(scoresTable).where(eq(scoresTable.id, homeTeamId));
  const awayScoreRecord = await db.select().from(scoresTable).where(eq(scoresTable.id, awayTeamId));

  console.log({ homeScoreRecord, awayScoreRecord });

  if (!homeScoreRecord.length || !awayScoreRecord.length) {
    return {
      message: "Score record not found for one of the teams",
    };
  }

  const homeScoreId = homeScoreRecord[0].id;
  const awayScoreId = awayScoreRecord[0].id;

  await db
    .update(scoresTable)
    .set({
      gamesPlayed: homeScoreRecord[0].gamesPlayed + 1,
      gamesWon:
        homeScoreRecord[0].gamesWon + (scoreDetails.homeScore > scoreDetails.awayScore ? 1 : 0),
      gamesLost:
        homeScoreRecord[0].gamesLost + (scoreDetails.homeScore < scoreDetails.awayScore ? 1 : 0),
      gamesDrawn:
        homeScoreRecord[0].gamesDrawn + (scoreDetails.homeScore === scoreDetails.awayScore ? 1 : 0),
      goalFor: homeScoreRecord[0].goalFor + scoreDetails.homeScore,
      goalAgainst: homeScoreRecord[0].goalAgainst + scoreDetails.awayScore,
      goalDifference:
        homeScoreRecord[0].goalFor +
        scoreDetails.homeScore -
        (homeScoreRecord[0].goalAgainst + scoreDetails.awayScore),
      points:
        homeScoreRecord[0].points +
        (scoreDetails.homeScore > scoreDetails.awayScore
          ? 3
          : scoreDetails.homeScore === scoreDetails.awayScore
          ? 1
          : 0),
    })
    .where(eq(scoresTable.id, homeScoreId));

  await db
    .update(scoresTable)
    .set({
      gamesPlayed: awayScoreRecord[0].gamesPlayed + 1,
      gamesWon:
        awayScoreRecord[0].gamesWon + (scoreDetails.awayScore > scoreDetails.homeScore ? 1 : 0),
      gamesLost:
        awayScoreRecord[0].gamesLost + (scoreDetails.awayScore < scoreDetails.homeScore ? 1 : 0),
      gamesDrawn:
        awayScoreRecord[0].gamesDrawn + (scoreDetails.homeScore === scoreDetails.awayScore ? 1 : 0),
      goalFor: awayScoreRecord[0].goalFor + scoreDetails.awayScore,
      goalAgainst: awayScoreRecord[0].goalAgainst + scoreDetails.homeScore,
      goalDifference:
        awayScoreRecord[0].goalFor +
        scoreDetails.awayScore -
        (awayScoreRecord[0].goalAgainst + scoreDetails.homeScore),
      points:
        awayScoreRecord[0].points +
        (scoreDetails.awayScore > scoreDetails.homeScore
          ? 3
          : scoreDetails.homeScore === scoreDetails.awayScore
          ? 1
          : 0),
    })
    .where(eq(scoresTable.id, awayScoreId));

  revalidateTag("teams");

  return {
    message: `Scores successfully updated`,
  };
}

export async function revertScores(prevState: unknown, formData: FormData) {
  const homeTeamName = formData.get("hometeam") as string;
  const awayTeamName = formData.get("awayteam") as string;
  const homeScore = Number(formData.get("homescores"));
  const awayScore = Number(formData.get("awayscores"));

  const scoreDetails = {
    homeTeamName,
    awayTeamName,
    homeScore,
    awayScore,
  };

  const homeTeam = await db
    .select()
    .from(teamsTable)
    .where(ilike(teamsTable.title, scoreDetails.homeTeamName));

  const awayTeam = await db
    .select()
    .from(teamsTable)
    .where(ilike(teamsTable.title, scoreDetails.awayTeamName));

  if (!homeTeam.length || !awayTeam.length) {
    return {
      message: "Team not found",
    };
  }

  const homeTeamId = homeTeam[0].id;
  const awayTeamId = awayTeam[0].id;

  const homeScoreRecord = await db.select().from(scoresTable).where(eq(scoresTable.id, homeTeamId));
  const awayScoreRecord = await db.select().from(scoresTable).where(eq(scoresTable.id, awayTeamId));

  if (!homeScoreRecord.length || !awayScoreRecord.length) {
    return {
      message: "Score record not found for one of the teams",
    };
  }

  const homeScoreId = homeScoreRecord[0].id;
  const awayScoreId = awayScoreRecord[0].id;

  // Reverse the stats update
  await db
    .update(scoresTable)
    .set({
      gamesPlayed: homeScoreRecord[0].gamesPlayed - 1,
      gamesWon:
        homeScoreRecord[0].gamesWon - (scoreDetails.homeScore > scoreDetails.awayScore ? 1 : 0),
      gamesLost:
        homeScoreRecord[0].gamesLost - (scoreDetails.homeScore < scoreDetails.awayScore ? 1 : 0),
      gamesDrawn:
        homeScoreRecord[0].gamesDrawn - (scoreDetails.homeScore === scoreDetails.awayScore ? 1 : 0),
      goalFor: homeScoreRecord[0].goalFor - scoreDetails.homeScore,
      goalAgainst: homeScoreRecord[0].goalAgainst - scoreDetails.awayScore,
      goalDifference:
        homeScoreRecord[0].goalDifference - (scoreDetails.homeScore - scoreDetails.awayScore),
      points:
        homeScoreRecord[0].points -
        (scoreDetails.homeScore > scoreDetails.awayScore
          ? 3
          : scoreDetails.homeScore === scoreDetails.awayScore
          ? 1
          : 0),
    })
    .where(eq(scoresTable.id, homeScoreId));

  await db
    .update(scoresTable)
    .set({
      gamesPlayed: awayScoreRecord[0].gamesPlayed - 1,
      gamesWon:
        awayScoreRecord[0].gamesWon - (scoreDetails.awayScore > scoreDetails.homeScore ? 1 : 0),
      gamesLost:
        awayScoreRecord[0].gamesLost - (scoreDetails.awayScore < scoreDetails.homeScore ? 1 : 0),
      gamesDrawn:
        awayScoreRecord[0].gamesDrawn - (scoreDetails.homeScore === scoreDetails.awayScore ? 1 : 0),
      goalFor: awayScoreRecord[0].goalFor - scoreDetails.awayScore,
      goalAgainst: awayScoreRecord[0].goalAgainst - scoreDetails.homeScore,
      goalDifference:
        awayScoreRecord[0].goalDifference - (scoreDetails.awayScore - scoreDetails.homeScore),
      points:
        awayScoreRecord[0].points -
        (scoreDetails.awayScore > scoreDetails.homeScore
          ? 3
          : scoreDetails.homeScore === scoreDetails.awayScore
          ? 1
          : 0),
    })
    .where(eq(scoresTable.id, awayScoreId));

  return {
    message: "Changes reverted successfully",
  };
}
