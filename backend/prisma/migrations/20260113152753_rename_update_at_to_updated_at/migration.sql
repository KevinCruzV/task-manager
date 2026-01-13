ALTER TABLE "Task"
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

UPDATE "Task"
SET "updatedAt" = "updateAt";

ALTER TABLE "Task"
DROP COLUMN "updateAt";
