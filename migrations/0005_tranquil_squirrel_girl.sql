ALTER TABLE "players" ADD COLUMN "goalsScored" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "assist" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "yellowCard" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "redCard" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "teamcolor" text NOT NULL;