/*
  Warnings:

  - Added the required column `tmdbid` to the `watchLater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "watchLater" ADD COLUMN     "tmdbid" INTEGER NOT NULL;
