-- 1. Add the new column without making it `NOT NULL` initially
ALTER TABLE "Teams" ADD COLUMN "teamFriendlyId" TEXT;

-- 2. Backfill data for the `teamFriendlyId` column
UPDATE "Teams"
SET "teamFriendlyId" = lower(regexp_replace("name", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substring(md5(random()::text), 1, 8)
WHERE "teamFriendlyId" IS NULL;

-- 3. Ensure uniqueness of `teamFriendlyId`
CREATE UNIQUE INDEX "Teams_teamFriendlyId_key" ON "Teams"("teamFriendlyId");

-- 4. Add a `NOT NULL` constraint to the `teamFriendlyId` column
ALTER TABLE "Teams" ALTER COLUMN "teamFriendlyId" SET NOT NULL;
