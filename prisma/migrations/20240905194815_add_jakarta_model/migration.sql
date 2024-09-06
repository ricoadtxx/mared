-- CreateTable
CREATE TABLE "Jakarta" (
    "id" SERIAL NOT NULL,
    "nama_kota" TEXT NOT NULL,
    "luas" DECIMAL(65,30) NOT NULL,
    "provinsi" TEXT NOT NULL,
    "koordinat" JSONB NOT NULL,

    CONSTRAINT "Jakarta_pkey" PRIMARY KEY ("id")
);
