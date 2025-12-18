/*
  Warnings:

  - Made the column `userId` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "userId" SET NOT NULL;
