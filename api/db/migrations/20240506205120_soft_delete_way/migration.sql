-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "UserBank" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
