/*
  Warnings:

  - You are about to drop the `DmList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DmList" DROP CONSTRAINT "DmList_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "DmList" TEXT[];

-- DropTable
DROP TABLE "DmList";
