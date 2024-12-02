-- CreateEnum
CREATE TYPE "GenderIdentity" AS ENUM ('Male', 'Female', 'Other', 'NotToSay');
 
-- CreateEnum
CREATE TYPE "CompletionStatusEnum" AS ENUM ('Pending', 'Completed', 'InProgress');
 
-- CreateTable
CREATE TABLE "UserProfiles" (
    "id" TEXT NOT NULL,
    "fullName" TEXT,
    "phoneNumber" TEXT,
    "emailAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "genderIdentity" "GenderIdentity",
    "race" TEXT[],
    "militaryVeteran" TEXT,
    "linkedInURL" TEXT,
    "websiteURL" TEXT,
    "githubURL" TEXT,
    "mediumURL" TEXT,
    "stackOverflowURL" TEXT,
    "calendarLink" TEXT,
    "completedSteps" TEXT,
    "status" "CompletionStatusEnum" NOT NULL DEFAULT 'Pending',
    "userId" TEXT NOT NULL UNIQUE, -- Ensuring userId is unique
 
    CONSTRAINT "UserProfiles_pkey" PRIMARY KEY ("id")
);
 
-- CreateIndex
CREATE INDEX "UserProfiles_userId_idx" ON "UserProfiles"("userId");
 
-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;