-- Link existing tracking entries with NULL profile to the user's default profile
UPDATE "tracking" t
SET "profileId" = (
    SELECT p.id FROM "profile" p
    WHERE p."userId" = t."userId" AND p."isDefault" = true
    LIMIT 1
)
WHERE t."profileId" IS NULL;

-- Link existing watchLater entries with NULL profile to the user's default profile
UPDATE "watchLater" w
SET "profileId" = (
    SELECT p.id FROM "profile" p
    WHERE p."userId" = w."userId" AND p."isDefault" = true
    LIMIT 1
)
WHERE w."profileId" IS NULL;