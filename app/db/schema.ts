import { integer, pgTable, serial, text, timestamp, PgArray } from "drizzle-orm/pg-core";

export const teamsTable = pgTable("teams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  teamColor: text("teamcolor").notNull(),
  scoreId: integer("scores")
    .notNull()
    .references(() => scoresTable.id),
  players: text("players").notNull().array(),
});

export const scoresTable = pgTable("scores", {
  id: serial("id").primaryKey(),
  gamesPlayed: integer("gamesPlayed").notNull(),
  gamesWon: integer("gamesWon").notNull(),
  gamesLost: integer("gamesLost").notNull(),
  gamesDrawn: integer("gamesDrawn").notNull(),
  goalFor: integer("goalFor").notNull(),
  goalAgainst: integer("goalAgainst").notNull(),
  goalDifference: integer("goalDifference").notNull(),
  points: integer("points").notNull(),
  form: text("form").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const playerTable = pgTable("players", {
  id: serial("id").primaryKey(),
  playerName: text("playerName").notNull(),
  goal: integer("goalsScored").notNull(),
  assist: integer("assist").notNull(),
  yellowCard: integer("yellowCard").notNull(),
  redCard: integer("redCard").notNull(),
});

export const teamPlayersTable = pgTable("team_and_players", {
  id: serial("id").primaryKey(),
  team_Id: integer("teams")
    .notNull()
    .references(() => teamsTable.id),
  player_Id: integer("players")
    .notNull()
    .references(() => playerTable.id)
    .unique(),
});

export type InsertTeam = typeof teamsTable.$inferInsert;
export type SelectTeam = typeof teamsTable.$inferSelect;

export type InsertPlayer = typeof playerTable.$inferInsert;
export type SelectPlayer = typeof playerTable.$inferSelect;

export type InsertScore = typeof scoresTable.$inferInsert;
export type SelectScore = typeof scoresTable.$inferSelect;

export type InsertTeamPlayer = typeof teamPlayersTable.$inferInsert;
export type SelectTeamPlayer = typeof teamPlayersTable.$inferSelect;
