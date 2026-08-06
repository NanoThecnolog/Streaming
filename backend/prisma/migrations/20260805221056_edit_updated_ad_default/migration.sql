/*
  Warnings:

  - The `dueDate` column on the `invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dataPaid` column on the `invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EfiNotificationStatus" AS ENUM ('PENDING', 'PROCESSING', 'PROCESSED', 'FAILED');

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "dueDate",
ADD COLUMN     "dueDate" TIMESTAMP(3),
DROP COLUMN "dataPaid",
ADD COLUMN     "dataPaid" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "accessUntil" TIMESTAMP(3),
ADD COLUMN     "trialEndsAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "EfiNotification" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "status" "EfiNotificationStatus" NOT NULL DEFAULT 'PENDING',
    "payload" JSONB,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EfiNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EfiNotification_token_key" ON "EfiNotification"("token");

-- CreateIndex
CREATE INDEX "EfiNotification_status_updatedAt_idx" ON "EfiNotification"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "subscription_accessUntil_idx" ON "subscription"("accessUntil");

-- CreateIndex
CREATE INDEX "subscriptionHistory_subscriptionId_changedAt_idx" ON "subscriptionHistory"("subscriptionId", "changedAt");
