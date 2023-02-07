/*
  Warnings:

  - You are about to drop the column `role` on the `ProjectHasMembers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_draftId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_liveId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "draftId" DROP NOT NULL,
ALTER COLUMN "liveId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectHasMembers" DROP COLUMN "role";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "ProjectInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_liveId_fkey" FOREIGN KEY ("liveId") REFERENCES "ProjectInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
