/*
  Warnings:

  - You are about to drop the column `amount` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `providerRef` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `chargeId` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "invoice_providerRef_key";

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "amount",
DROP COLUMN "providerRef",
ADD COLUMN     "chargeId" INTEGER NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;
