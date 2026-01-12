-- CreateTable
CREATE TABLE "userGenPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "genId" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userGenPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gen" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "userGenPreference_userId_idx" ON "userGenPreference"("userId");

-- CreateIndex
CREATE INDEX "userGenPreference_genId_idx" ON "userGenPreference"("genId");

-- CreateIndex
CREATE UNIQUE INDEX "userGenPreference_userId_genId_key" ON "userGenPreference"("userId", "genId");

-- CreateIndex
CREATE UNIQUE INDEX "gen_name_key" ON "gen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gen_slug_key" ON "gen"("slug");

-- AddForeignKey
ALTER TABLE "userGenPreference" ADD CONSTRAINT "userGenPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGenPreference" ADD CONSTRAINT "userGenPreference_genId_fkey" FOREIGN KEY ("genId") REFERENCES "gen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
