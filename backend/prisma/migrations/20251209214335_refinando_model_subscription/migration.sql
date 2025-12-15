/*
  Warnings:

  - You are about to drop the column `efiId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `renewAt` on the `subscription` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "subscription_efiId_key";

-- DropIndex
DROP INDEX "subscription_renewAt_idx";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "efiId",
DROP COLUMN "expiresAt",
DROP COLUMN "renewAt";
