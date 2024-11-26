/*
  Warnings:

  - Added the required column `statusId` to the `process_file` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "process_file_City_CountryFull_createdAt_EmailAddress_Gender_idx";

-- AlterTable
ALTER TABLE "process_file" ADD COLUMN     "statusId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "process_file_GivenName_City_TropicalZodiac_Occupation_Vehic_idx" ON "process_file"("GivenName", "City", "TropicalZodiac", "Occupation", "Vehicle", "CountryFull");

-- AddForeignKey
ALTER TABLE "process_file" ADD CONSTRAINT "process_file_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
