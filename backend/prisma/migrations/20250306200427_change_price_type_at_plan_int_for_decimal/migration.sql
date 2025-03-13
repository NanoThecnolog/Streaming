/*
  Warnings:

  - A unique constraint covering the columns `[planId]` on the table `plan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "plan" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "plan_planId_key" ON "plan"("planId");
