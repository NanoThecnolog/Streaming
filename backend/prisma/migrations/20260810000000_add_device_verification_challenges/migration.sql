CREATE TABLE "deviceVerificationChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "replaceDeviceId" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),

    CONSTRAINT "deviceVerificationChallenge_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "deviceVerificationChallenge_userId_consumedAt_idx"
ON "deviceVerificationChallenge"("userId", "consumedAt");
CREATE INDEX "deviceVerificationChallenge_expiresAt_idx"
ON "deviceVerificationChallenge"("expiresAt");

ALTER TABLE "deviceVerificationChallenge"
ADD CONSTRAINT "deviceVerificationChallenge_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
