CREATE TABLE IF NOT EXISTS "player_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"playerName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scores_table" (
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
CREATE TABLE IF NOT EXISTS "team_players" (
	"id" serial PRIMARY KEY NOT NULL,
	"teams_table" integer NOT NULL,
	"player_table" integer NOT NULL,
	CONSTRAINT "unique_player_per_team" UNIQUE("player_table")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"scores_table" integer NOT NULL,
	"player_table" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_players" ADD CONSTRAINT "team_players_teams_table_team_table_id_fk" FOREIGN KEY ("teams_table") REFERENCES "public"."team_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_players" ADD CONSTRAINT "team_players_player_table_player_table_id_fk" FOREIGN KEY ("player_table") REFERENCES "public"."player_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_table" ADD CONSTRAINT "team_table_scores_table_scores_table_id_fk" FOREIGN KEY ("scores_table") REFERENCES "public"."scores_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_table" ADD CONSTRAINT "team_table_player_table_player_table_id_fk" FOREIGN KEY ("player_table") REFERENCES "public"."player_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
