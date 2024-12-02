-- CreateTable
CREATE TABLE "OnBoardingUserProfiles" (
    "id" TEXT NOT NULL,
    "useCaseType" "UseCaseTypes" DEFAULT 'None',
    "businessType" "BusinessTypes",
    "fullName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "companyName" TEXT,
    "phoneNumber" TEXT,
    "emailAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "countryRegion" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "postalCode" TEXT,
    "genderIdentity" "GenderIdentity",
    "race" TEXT[],
    "militaryVeteran" TEXT,
    "linkedInURL" TEXT,
    "websiteURL" TEXT,
    "githubURL" TEXT,
    "mediumURL" TEXT,
    "stackOverflowURL" TEXT,
    "calendarLink" TEXT,
    "businessName" TEXT,
    "businessUrl" TEXT,
    "businessEmail" TEXT,
    "businessIndustry" TEXT,
    "onboardingPlan" TEXT,
    "onboardingCompleted" BOOLEAN DEFAULT false,
    "onboardingStep" INTEGER,
    "completedSteps" TEXT,
    "themeMode" "ThemeModeEnum",
    "status" "CompletionStatusEnum" NOT NULL DEFAULT 'Pending',
    "userId" TEXT NOT NULL,

    CONSTRAINT "OnBoardingUserProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnBoardingUserProfiles_userId_key" ON "OnBoardingUserProfiles"("userId");

-- AddForeignKey
ALTER TABLE "OnBoardingUserProfiles" ADD CONSTRAINT "OnBoardingUserProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
