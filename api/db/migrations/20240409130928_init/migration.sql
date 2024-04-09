/*
  Warnings:

  - Added the required column `userBankId` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "userBankId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userBankId_fkey" FOREIGN KEY ("userBankId") REFERENCES "UserBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
