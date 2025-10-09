/*
  Warnings:

  - You are about to drop the column `banned_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "banned_at",
DROP COLUMN "last_login";
