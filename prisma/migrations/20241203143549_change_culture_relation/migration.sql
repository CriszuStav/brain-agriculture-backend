-- DropForeignKey
ALTER TABLE "Cultura" DROP CONSTRAINT "Cultura_produtorId_fkey";

-- AlterTable
ALTER TABLE "Cultura" ALTER COLUMN "produtorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cultura" ADD CONSTRAINT "Cultura_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
