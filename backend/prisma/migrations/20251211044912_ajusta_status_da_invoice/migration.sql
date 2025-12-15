/*
  Warnings:

  - The values [pending,failed] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceStatus_new" AS ENUM ('new', 'waiting', 'identified', 'approved', 'paid', 'unpaid', 'refunded', 'contested', 'canceled', 'settled', 'expired');
ALTER TABLE "invoice" ALTER COLUMN "status" TYPE "InvoiceStatus_new" USING ("status"::text::"InvoiceStatus_new");
ALTER TYPE "InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "InvoiceStatus_old";
COMMIT;
