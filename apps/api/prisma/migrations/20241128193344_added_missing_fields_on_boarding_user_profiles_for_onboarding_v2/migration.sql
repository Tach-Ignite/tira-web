-- AlterTable
ALTER TABLE "OnBoardingUserProfiles" ADD COLUMN     "businessCity" TEXT,
ADD COLUMN     "businessCountryRegion" TEXT,
ADD COLUMN     "businessLinkedInURL" TEXT,
ADD COLUMN     "businessPostalCode" TEXT,
ADD COLUMN     "businessState" TEXT,
ADD COLUMN     "profileImageUrl" TEXT;

-- AlterTable
ALTER TABLE "UserProfiles" ADD COLUMN     "businessCity" TEXT,
ADD COLUMN     "businessCountryRegion" TEXT,
ADD COLUMN     "businessLinkedInURL" TEXT,
ADD COLUMN     "businessPostalCode" TEXT,
ADD COLUMN     "businessState" TEXT,
ADD COLUMN     "profileImageUrl" TEXT;
