-- DropForeignKey
ALTER TABLE "UserProfiles" DROP CONSTRAINT "UserProfiles_userId_fkey";

-- DropIndex
DROP INDEX "UserProfiles_userId_idx";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "billingAddress" JSONB,
ADD COLUMN     "isSameAsShippingInformation" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
