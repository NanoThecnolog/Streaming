-- AlterTable
ALTER TABLE "watchLater" ADD COLUMN "profileId" TEXT;

-- CreateIndex
CREATE INDEX "watchLater_profileId_idx" ON "watchLater"("profileId");

-- AddForeignKey
ALTER TABLE "watchLater" ADD CONSTRAINT "watchLater_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;