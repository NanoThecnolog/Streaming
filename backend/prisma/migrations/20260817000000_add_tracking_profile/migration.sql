-- AlterTable
ALTER TABLE "tracking" ADD COLUMN "profileId" TEXT;

-- CreateIndex
CREATE INDEX "tracking_profileId_idx" ON "tracking"("profileId");

-- AddForeignKey
ALTER TABLE "tracking" ADD CONSTRAINT "tracking_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;