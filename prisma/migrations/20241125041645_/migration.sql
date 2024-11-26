-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('PENDDING', 'END', 'ERROR');

-- CreateTable
CREATE TABLE "process_file" (
    "id" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "NameSet" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "GivenName" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "StreetAddress" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "EmailAddress" TEXT NOT NULL,
    "TropicalZodiac" TEXT NOT NULL,
    "Occupation" TEXT NOT NULL,
    "Vehicle" TEXT NOT NULL,
    "CountryFull" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "process_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL,
    "status" "StatusType" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "process_file_City_CountryFull_createdAt_EmailAddress_Gender_idx" ON "process_file"("City", "CountryFull", "createdAt", "EmailAddress", "Gender", "GivenName", "Title", "Vehicle", "Surname");

-- CreateIndex
CREATE INDEX "status_id_idx" ON "status"("id");
