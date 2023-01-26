/*
  Warnings:

  - The primary key for the `ProjectHasLead` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `projectId` on the `ProjectHasLead` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ProjectHasLead" DROP CONSTRAINT "ProjectHasLead_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectHasLead" DROP CONSTRAINT "ProjectHasLead_pkey",
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD CONSTRAINT "ProjectHasLead_pkey" PRIMARY KEY ("projectId", "leadId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectHasLead_projectId_key" ON "ProjectHasLead"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectHasLead" ADD CONSTRAINT "ProjectHasLead_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
