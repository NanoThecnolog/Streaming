-- CreateEnum
CREATE TYPE "WatchedMediaType" AS ENUM ('movie', 'tv');

-- CreateTable
CREATE TABLE "watched" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tmdbID" INTEGER NOT NULL,
    "mediaType" "WatchedMediaType" NOT NULL,
    "season" INTEGER NOT NULL DEFAULT 0,
    "episode" INTEGER NOT NULL DEFAULT 0,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "lastWatched" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watched_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "watched_userId_idx" ON "watched"("userId");

-- CreateIndex
CREATE INDEX "watched_tmdbID_idx" ON "watched"("tmdbID");

-- CreateIndex
CREATE INDEX "watched_userId_completed_idx" ON "watched"("userId", "completed");

-- CreateIndex
CREATE UNIQUE INDEX "watched_userId_tmdbID_season_episode_key" ON "watched"("userId", "tmdbID", "season", "episode");

-- AddForeignKey
ALTER TABLE "watched" ADD CONSTRAINT "watched_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
