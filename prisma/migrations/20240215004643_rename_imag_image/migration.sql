/*
  Warnings:

  - You are about to drop the column `imag` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "imag",
ADD COLUMN     "image" TEXT;
