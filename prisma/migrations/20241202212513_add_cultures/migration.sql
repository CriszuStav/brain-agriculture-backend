/*
  Warnings:

  - You are about to drop the column `culture` on the `Produtor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produtor" DROP COLUMN "culture";

-- CreateTable
CREATE TABLE "Cultura" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "produtorId" TEXT NOT NULL,

    CONSTRAINT "Cultura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cultura" ADD CONSTRAINT "Cultura_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
