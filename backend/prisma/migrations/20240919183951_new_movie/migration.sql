/*
  Warnings:

  - Added the required column `avatar` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatar" TEXT NOT NULL,
ALTER COLUMN "donator" SET DEFAULT false;

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "src" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "overlay" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "genero" TEXT[],

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);
