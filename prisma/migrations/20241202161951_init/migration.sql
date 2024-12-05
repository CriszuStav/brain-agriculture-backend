-- CreateTable
CREATE TABLE "Produtor" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "agricultureArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "culture" TEXT NOT NULL,

    CONSTRAINT "Produtor_pkey" PRIMARY KEY ("id")
);
