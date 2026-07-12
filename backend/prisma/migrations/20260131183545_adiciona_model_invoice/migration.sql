-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "current" "InvoiceStatus" NOT NULL,
    "preview" "InvoiceStatus" NOT NULL,
    "chargeId" INTEGER NOT NULL,
    "subscriptionId" TEXT,
    "dueDate" TEXT,
    "dataPaid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_chargeId_key" ON "invoice"("chargeId");

-- CreateIndex
CREATE INDEX "invoice_current_createdAt_idx" ON "invoice"("current", "createdAt");

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
