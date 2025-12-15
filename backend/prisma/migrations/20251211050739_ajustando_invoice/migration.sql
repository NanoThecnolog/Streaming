-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
