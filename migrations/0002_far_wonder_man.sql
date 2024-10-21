ALTER TABLE "team_and_players" DROP CONSTRAINT "unique_player_per_team";--> statement-breakpoint
ALTER TABLE "team_and_players" DROP CONSTRAINT "team_and_players_teams_table_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "team_and_players" DROP CONSTRAINT "team_and_players_player_table_players_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_scores_table_scores_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_player_table_players_id_fk";
--> statement-breakpoint
ALTER TABLE "team_and_players" ADD COLUMN "teams" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "team_and_players" ADD COLUMN "players" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "scores" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "players" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_and_players" ADD CONSTRAINT "team_and_players_teams_teams_id_fk" FOREIGN KEY ("teams") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_and_players" ADD CONSTRAINT "team_and_players_players_players_id_fk" FOREIGN KEY ("players") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_scores_scores_id_fk" FOREIGN KEY ("scores") REFERENCES "public"."scores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_players_players_id_fk" FOREIGN KEY ("players") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "team_and_players" DROP COLUMN IF EXISTS "teams_table";--> statement-breakpoint
ALTER TABLE "team_and_players" DROP COLUMN IF EXISTS "player_table";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN IF EXISTS "scores_table";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN IF EXISTS "player_table";--> statement-breakpoint
ALTER TABLE "team_and_players" ADD CONSTRAINT "team_and_players_players_unique" UNIQUE("players");