/*
  Warnings:

  - You are about to drop the column `author` on the `Music` table. All the data in the column will be lost.
  - Added the required column `artist` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Music" DROP COLUMN "author",
ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
