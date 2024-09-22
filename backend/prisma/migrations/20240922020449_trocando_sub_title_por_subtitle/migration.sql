/*
  Warnings:

  - You are about to drop the column `subTitle` on the `movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "subTitle",
ADD COLUMN     "subtitle" TEXT;
