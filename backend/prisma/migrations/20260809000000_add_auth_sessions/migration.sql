CREATE TABLE "authSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "authSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "authSession_tokenHash_key" ON "authSession"("tokenHash");
CREATE INDEX "authSession_userId_revokedAt_idx" ON "authSession"("userId", "revokedAt");
CREATE INDEX "authSession_expiresAt_idx" ON "authSession"("expiresAt");

ALTER TABLE "authSession"
ADD CONSTRAINT "authSession_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
