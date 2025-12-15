/*
  Warnings:

  - A unique constraint covering the columns `[subId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[efiId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `renewAt` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'inactive', 'canceled', 'expired', 'trial');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('paid', 'pending', 'failed', 'refunded');

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "efiId" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "renewAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL;

-- CreateTable
CREATE TABLE "subscriptionHistory" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "fromStatus" TEXT NOT NULL,
    "toStatus" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "providerRef" TEXT,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_providerRef_key" ON "invoice"("providerRef");

-- CreateIndex
CREATE INDEX "invoice_status_idx" ON "invoice"("status");

-- CreateIndex
CREATE INDEX "invoice_dueDate_idx" ON "invoice"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_subId_key" ON "subscription"("subId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_efiId_key" ON "subscription"("efiId");

-- CreateIndex
CREATE INDEX "subscription_status_idx" ON "subscription"("status");

-- CreateIndex
CREATE INDEX "subscription_renewAt_idx" ON "subscription"("renewAt");

-- AddForeignKey
ALTER TABLE "subscriptionHistory" ADD CONSTRAINT "subscriptionHistory_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
