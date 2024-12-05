-- DropForeignKey
ALTER TABLE "Cultura" DROP CONSTRAINT "Cultura_produtorId_fkey";

-- AddForeignKey
ALTER TABLE "Cultura" ADD CONSTRAINT "Cultura_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
