/*
  Warnings:

  - You are about to drop the column `website` on the `Organizations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Organizations_name_website_key";

-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "website",
ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "companyEmail" TEXT,
ADD COLUMN     "companyPhone" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "linkedInURL" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "websiteURL" TEXT,
ADD COLUMN     "zipCode" TEXT;
