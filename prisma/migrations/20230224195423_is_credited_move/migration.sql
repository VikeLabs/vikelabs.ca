/*
  Warnings:

  - You are about to drop the column `isCredited` on the `ProjectHasLead` table. All the data in the column will be lost.
  - You are about to drop the column `isCredited` on the `ProjectHasMembers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectHasLead" DROP COLUMN "isCredited";

-- AlterTable
ALTER TABLE "ProjectHasMembers" DROP COLUMN "isCredited";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isCredited" BOOLEAN NOT NULL DEFAULT false;
