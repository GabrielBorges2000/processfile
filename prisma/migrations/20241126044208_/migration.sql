/*
  Warnings:

  - You are about to drop the `process_file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "process_file" DROP CONSTRAINT "process_file_statusId_fkey";

-- DropTable
DROP TABLE "process_file";

-- DropTable
DROP TABLE "status";

-- CreateTable
CREATE TABLE "users" (
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
    "uploadId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploads" (
    "id" TEXT NOT NULL,
    "status" "StatusType" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_GivenName_City_TropicalZodiac_Occupation_Vehicle_Coun_idx" ON "users"("GivenName", "City", "TropicalZodiac", "Occupation", "Vehicle", "CountryFull");

-- CreateIndex
CREATE INDEX "uploads_id_idx" ON "uploads"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "uploads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
