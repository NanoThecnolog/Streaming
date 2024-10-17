/*
  Warnings:

  - Changed the type of `tmdbid` on the `favorito` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "favorito" DROP COLUMN "tmdbid",
ADD COLUMN     "tmdbid" INTEGER NOT NULL;
