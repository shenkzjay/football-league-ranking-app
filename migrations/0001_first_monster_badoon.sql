CREATE TABLE IF NOT EXISTS "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"playerName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"gamesPlayed" integer NOT NULL,
	"gamesWon" integer NOT NULL,
	"gamesLost" integer NOT NULL,
	"goalFor" integer NOT NULL,
	"goalAgainst" integer NOT NULL,
	"goalDifference" integer NOT NULL,
	"points" integer NOT NULL,
	"form" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_and_players" (
	"id" serial PRIMARY KEY NOT NULL,
	"teams_table" integer NOT NULL,
	"player_table" integer NOT NULL,
	CONSTRAINT "unique_player_per_team" UNIQUE("player_table")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"scores_table" integer NOT NULL,
	"player_table" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "player_table";--> statement-breakpoint
DROP TABLE "scores_table";--> statement-breakpoint
DROP TABLE "team_players";--> statement-breakpoint
DROP TABLE "team_table";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_and_players" ADD CONSTRAINT "team_and_players_teams_table_teams_id_fk" FOREIGN KEY ("teams_table") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_and_players" ADD CONSTRAINT "team_and_players_player_table_players_id_fk" FOREIGN KEY ("player_table") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_scores_table_scores_id_fk" FOREIGN KEY ("scores_table") REFERENCES "public"."scores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_player_table_players_id_fk" FOREIGN KEY ("player_table") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
