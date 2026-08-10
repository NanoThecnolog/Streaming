CREATE TABLE "trustedDevice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "trustedDevice_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "authSession" ADD COLUMN "deviceId" TEXT;

CREATE UNIQUE INDEX "trustedDevice_tokenHash_key" ON "trustedDevice"("tokenHash");
CREATE INDEX "trustedDevice_userId_revokedAt_idx" ON "trustedDevice"("userId", "revokedAt");
CREATE INDEX "trustedDevice_lastSeenAt_idx" ON "trustedDevice"("lastSeenAt");
CREATE INDEX "authSession_deviceId_idx" ON "authSession"("deviceId");

ALTER TABLE "trustedDevice"
ADD CONSTRAINT "trustedDevice_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "authSession"
ADD CONSTRAINT "authSession_deviceId_fkey"
FOREIGN KEY ("deviceId") REFERENCES "trustedDevice"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
