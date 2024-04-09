/*
  Warnings:

  - Added the required column `paymentMethod` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserBank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "paymentMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserBank" ADD COLUMN     "name" TEXT NOT NULL;
