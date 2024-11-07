import { pgTable, serial, text, integer, foreignKey, unique, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const players = pgTable("players", {
	id: serial().primaryKey().notNull(),
	playerName: text().notNull(),
	goalsScored: integer().notNull(),
	assist: integer().notNull(),
	yellowCard: integer().notNull(),
	redCard: integer().notNull(),
});

export const teams = pgTable("teams", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	scores: integer().notNull(),
	players: text().array(),
	teamcolor: text().notNull(),
},
(table) => {
	return {
		teamsScoresScoresIdFk: foreignKey({
			columns: [table.scores],
			foreignColumns: [scores.id],
			name: "teams_scores_scores_id_fk"
		}),
	}
});

export const teamAndPlayers = pgTable("team_and_players", {
	id: serial().primaryKey().notNull(),
	teams: integer().notNull(),
	players: integer().notNull(),
},
(table) => {
	return {
		teamAndPlayersPlayersPlayersIdFk: foreignKey({
			columns: [table.players],
			foreignColumns: [players.id],
			name: "team_and_players_players_players_id_fk"
		}),
		teamAndPlayersTeamsTeamsIdFk: foreignKey({
			columns: [table.teams],
			foreignColumns: [teams.id],
			name: "team_and_players_teams_teams_id_fk"
		}),
		teamAndPlayersPlayersUnique: unique("team_and_players_players_unique").on(table.players),
	}
});

export const scores = pgTable("scores", {
	id: serial().primaryKey().notNull(),
	gamesPlayed: integer().notNull(),
	gamesWon: integer().notNull(),
	gamesLost: integer().notNull(),
	goalFor: integer().notNull(),
	goalAgainst: integer().notNull(),
	goalDifference: integer().notNull(),
	points: integer().notNull(),
	form: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	gamesDrawn: integer().notNull(),
});
