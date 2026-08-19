-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileGenPreference" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "genId" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profileGenPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_name_key" ON "profile"("userId", "name");

-- CreateIndex
CREATE INDEX "profile_userId_idx" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profileGenPreference_profileId_genId_key" ON "profileGenPreference"("profileId", "genId");

-- CreateIndex
CREATE INDEX "profileGenPreference_profileId_idx" ON "profileGenPreference"("profileId");

-- CreateIndex
CREATE INDEX "profileGenPreference_genId_idx" ON "profileGenPreference"("genId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileGenPreference" ADD CONSTRAINT "profileGenPreference_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileGenPreference" ADD CONSTRAINT "profileGenPreference_genId_fkey" FOREIGN KEY ("genId") REFERENCES "gen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddColumn
ALTER TABLE "watched" ADD COLUMN "profileId" TEXT;

-- CreateIndex
CREATE INDEX "watched_profileId_idx" ON "watched"("profileId");

-- AddForeignKey
ALTER TABLE "watched" ADD CONSTRAINT "watched_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Migrate existing watched data: create default profiles for users with watched entries
INSERT INTO "profile" ("id", "userId", "name", "avatar", "isDefault", "createdAt", "updatedAt")
SELECT
    gen_random_uuid()::text,
    u.id,
    u.name,
    u.avatar,
    true,
    NOW(),
    NOW()
FROM "user" u
WHERE NOT EXISTS (
    SELECT 1 FROM "profile" p WHERE p."userId" = u.id
);

-- Update watched entries to link to the default profile
UPDATE "watched" w
SET "profileId" = (
    SELECT p.id FROM "profile" p
    WHERE p."userId" = w."userId" AND p."isDefault" = true
    LIMIT 1
)
WHERE w."profileId" IS NULL;

-- Recreate the unique index on watched to use profileId
DROP INDEX IF EXISTS "watched_userId_tmdbID_season_episode_key";

-- CreateIndex
CREATE UNIQUE INDEX "watched_profileId_tmdbID_season_episode_key" ON "watched"("profileId", "tmdbID", "season", "episode");

-- RemoveForeignKey (remove old userGenPreference dependencies before dropping)
-- Drop the old userGenPreference table
DROP TABLE IF EXISTS "userGenPreference";

-- Update gen table relation (Prisma handles this via the schema, but we keep the table)
