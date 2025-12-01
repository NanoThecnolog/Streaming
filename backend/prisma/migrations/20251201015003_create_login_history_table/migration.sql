-- AlterTable
ALTER TABLE "user" ALTER COLUMN "verified" SET DEFAULT true;

-- CreateTable
CREATE TABLE "loginHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loginHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "loginHistory" ADD CONSTRAINT "loginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
