/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `Music` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Music_position_key" ON "Music"("position");
