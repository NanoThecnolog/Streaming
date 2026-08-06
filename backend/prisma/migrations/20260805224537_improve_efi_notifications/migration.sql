/*
  Warnings:

  - A unique constraint covering the columns `[notificationToken,efiEventId]` on the table `subscriptionHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EfiNotification" ADD COLUMN     "lastEventId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "accessEndsAt" TIMESTAMP(3),
ADD COLUMN     "accessStartsAt" TIMESTAMP(3),
ADD COLUMN     "lastEventId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "value" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "dueDate" SET DATA TYPE TEXT,
ALTER COLUMN "dataPaid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "subscriptionHistory" ADD COLUMN     "efiEventId" INTEGER,
ADD COLUMN     "notificationToken" TEXT,
ALTER COLUMN "fromStatus" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "invoice_subscriptionId_idx" ON "invoice"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptionHistory_notificationToken_efiEventId_key" ON "subscriptionHistory"("notificationToken", "efiEventId");
