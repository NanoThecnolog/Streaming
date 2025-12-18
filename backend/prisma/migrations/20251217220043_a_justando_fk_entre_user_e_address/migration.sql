/*
  Warnings:

  - You are about to drop the column `addressId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "loginHistory" DROP CONSTRAINT "loginHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_addressId_fkey";

-- DropIndex
DROP INDEX "user_addressId_key";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "addressId",
ALTER COLUMN "verified" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- AddForeignKey
ALTER TABLE "loginHistory" ADD CONSTRAINT "loginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
