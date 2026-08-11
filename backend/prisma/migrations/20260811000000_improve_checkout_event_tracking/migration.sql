-- AlterTable
ALTER TABLE "CheckoutTrack"
ADD COLUMN "cardDocumentFilled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CheckoutTrackEvent"
ADD COLUMN "eventId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutTrackEvent_eventId_key"
ON "CheckoutTrackEvent"("eventId");
