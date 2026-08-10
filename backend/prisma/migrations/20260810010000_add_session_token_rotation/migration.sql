ALTER TABLE "authSession"
ADD COLUMN "previousTokenHash" TEXT,
ADD COLUMN "previousTokenExpiresAt" TIMESTAMP(3);

CREATE INDEX "authSession_previousTokenHash_idx" ON "authSession"("previousTokenHash");
