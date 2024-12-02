-- CreateEnum
CREATE TYPE "UseCaseTypes" AS ENUM ('Individual', 'Business', 'Both', 'None');

-- CreateEnum
CREATE TYPE "BusinessTypes" AS ENUM ('PaintSupplier', 'BusinessPartner', 'ColorConsultant', 'Other');

-- CreateEnum
CREATE TYPE "ProfileRoles" AS ENUM ('MasterOfHues', 'PigmentWizard', 'ShadeGuru', 'ContentCreator', 'ThreeDDesigner', 'SpectrumExplorer');

-- AlterTable
ALTER TABLE "UserProfiles" ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "businessType" "BusinessTypes",
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "countryRegion" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "useCaseType" "UseCaseTypes" DEFAULT 'None';
