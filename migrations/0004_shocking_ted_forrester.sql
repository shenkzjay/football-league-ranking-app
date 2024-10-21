ALTER TABLE "teams" ALTER COLUMN "players" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "players" DROP NOT NULL;