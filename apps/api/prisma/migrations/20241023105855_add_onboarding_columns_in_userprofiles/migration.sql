-- AlterTable
ALTER TABLE "UserProfiles" ADD COLUMN     "businessEmail" TEXT,
ADD COLUMN     "businessIndustry" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "businessUrl" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "onboardingCompleted" BOOLEAN DEFAULT false,
ADD COLUMN     "onboardingStep" INTEGER,
ADD COLUMN     "personalizedContent" TEXT[],
ADD COLUMN     "personalizedServices" TEXT[],
ADD COLUMN     "onboardingPlan" TEXT,
ADD COLUMN     "tiraUsedFor" TEXT;
