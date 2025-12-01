/*
  Warnings:

  - You are about to drop the column `createdAt` on the `loginHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `loginHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "loginHistory" DROP COLUMN "createdAt",
ADD COLUMN     "lastAccess" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "loginHistory_userId_key" ON "loginHistory"("userId");
