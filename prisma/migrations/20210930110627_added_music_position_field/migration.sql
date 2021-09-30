-- DropIndex
DROP INDEX "Music_position_key";

-- AlterTable
ALTER TABLE "Music" ALTER COLUMN "position" DROP DEFAULT;
