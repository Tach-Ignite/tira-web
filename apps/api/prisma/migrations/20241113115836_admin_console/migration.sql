-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('Active', 'DeActive');

-- CreateEnum
CREATE TYPE "InviteType" AS ENUM ('Organization', 'Team');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('Pending', 'Expired');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "userStatus" "ActiveStatus" DEFAULT 'Active';

-- CreateTable
CREATE TABLE "Organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgUsers" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "invitedUserId" TEXT NOT NULL,
    "inviteType" "InviteType" NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "status" "InviteStatus" NOT NULL,
    "roleId" TEXT NOT NULL,
    "orgId" TEXT,
    "teamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamUsers" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "TeamUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_name_website_key" ON "Organizations"("name", "website");

-- CreateIndex
CREATE UNIQUE INDEX "OrgUsers_orgId_userId_key" ON "OrgUsers"("orgId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invites_inviteCode_key" ON "Invites"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_orgId_name_key" ON "Teams"("orgId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamUsers_teamId_userId_key" ON "TeamUsers"("teamId", "userId");

-- AddForeignKey
ALTER TABLE "OrgUsers" ADD CONSTRAINT "OrgUsers_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUsers" ADD CONSTRAINT "OrgUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUsers" ADD CONSTRAINT "OrgUsers_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamUsers" ADD CONSTRAINT "TeamUsers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamUsers" ADD CONSTRAINT "TeamUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamUsers" ADD CONSTRAINT "TeamUsers_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
