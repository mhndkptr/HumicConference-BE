/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "start_time" DROP NOT NULL,
ALTER COLUMN "end_time" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rooms_identifier_key" ON "rooms"("identifier");
