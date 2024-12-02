-- 1. Add the new column without making it `NOT NULL` initially
ALTER TABLE "Organizations" ADD COLUMN "orgFriendlyId" TEXT;

-- 2. Backfill data for the `orgFriendlyId` column
UPDATE "Organizations"
SET "orgFriendlyId" = lower(regexp_replace("name", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substring(md5(random()::text), 1, 8)
WHERE "orgFriendlyId" IS NULL;

-- 3. Ensure uniqueness of `orgFriendlyId`
CREATE UNIQUE INDEX "Organizations_orgFriendlyId_key" ON "Organizations"("orgFriendlyId");

-- 4. Add a `NOT NULL` constraint to the `orgFriendlyId` column
ALTER TABLE "Organizations" ALTER COLUMN "orgFriendlyId" SET NOT NULL;
