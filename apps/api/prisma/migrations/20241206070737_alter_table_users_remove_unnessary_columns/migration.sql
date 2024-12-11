/*
  Warnings:

  - You are about to drop the column `firstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "name",
DROP COLUMN "profileImage",
DROP COLUMN "phoneNumber";