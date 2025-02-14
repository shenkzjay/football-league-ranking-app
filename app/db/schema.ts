import { date, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

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

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const seasonsTable = pgTable("seasons", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  description: text("description"),
});

export const competitionsTable = pgTable("competitions", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  seasonId: integer("season_id")
    .notNull()
    .references(() => seasonsTable.id),
});

export const competitionTeamsTable = pgTable("competition_teams", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id")
    .notNull()
    .references(() => competitionsTable.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teamsTable.id),
});

export const competitionPlayersTable = pgTable("competition_players", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id")
    .notNull()
    .references(() => competitionsTable.id),
  playerId: integer("player_id")
    .notNull()
    .references(() => playerTable.id),
});

export const competitionScoresTable = pgTable("competition_scores", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id")
    .notNull()
    .references(() => competitionsTable.id),
  scoreId: integer("score_id")
    .notNull()
    .references(() => scoresTable.id),
});

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  blogImage: text("blog_image").notNull(),
  blogTitle: text("blog_title").notNull(),
  slug: text("slug").notNull(),
  blogContent: text("blog_content").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => authorsTable.id),
  seasonId: integer("season_id")
    .notNull()
    .references(() => seasonsTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const authorsTable = pgTable("authors", {
  id: serial("id").primaryKey(),
  authorName: text("author_name").notNull(),
  authorBio: text("author_bio").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertTeam = typeof teamsTable.$inferInsert;
export type SelectTeam = typeof teamsTable.$inferSelect;

export type InsertSeason = typeof seasonsTable.$inferInsert;
export type SelectSeason = typeof seasonsTable.$inferInsert;

export type InsertBlog = typeof blogPostsTable.$inferSelect;
export type SelectBlogPost = typeof blogPostsTable.$inferSelect;

export type InsertPlayer = typeof playerTable.$inferInsert;
export type SelectPlayer = typeof playerTable.$inferSelect;

export type InsertScore = typeof scoresTable.$inferInsert;
export type SelectScore = typeof scoresTable.$inferSelect;

export type InsertTeamPlayer = typeof teamPlayersTable.$inferInsert;
export type SelectTeamPlayer = typeof teamPlayersTable.$inferSelect;
