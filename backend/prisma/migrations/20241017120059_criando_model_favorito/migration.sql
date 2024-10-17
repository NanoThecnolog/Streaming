-- CreateTable
CREATE TABLE "favorito" (
    "id" TEXT NOT NULL,
    "tmdbid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorito_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorito" ADD CONSTRAINT "favorito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
