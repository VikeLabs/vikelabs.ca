/*
  Warnings:

  - The primary key for the `ProjectHasMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `projectId` on the `ProjectHasMembers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ProjectHasMembers" DROP CONSTRAINT "ProjectHasMembers_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectHasMembers" DROP CONSTRAINT "ProjectHasMembers_pkey",
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD CONSTRAINT "ProjectHasMembers_pkey" PRIMARY KEY ("projectId", "memberId");

-- AddForeignKey
ALTER TABLE "ProjectHasMembers" ADD CONSTRAINT "ProjectHasMembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
