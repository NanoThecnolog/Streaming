/*
  Warnings:

  - You are about to alter the column `price` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "plan" ALTER COLUMN "price" SET DATA TYPE INTEGER;
