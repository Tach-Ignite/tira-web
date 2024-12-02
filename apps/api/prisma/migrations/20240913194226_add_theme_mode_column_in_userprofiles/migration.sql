-- Add ThemeModeEnum enum
CREATE TYPE "ThemeModeEnum" AS ENUM ('dark', 'light', 'auto');
 
-- Alter UserProfiles table to add themeMode column
ALTER TABLE "UserProfiles"
ADD COLUMN "themeMode" "ThemeModeEnum";