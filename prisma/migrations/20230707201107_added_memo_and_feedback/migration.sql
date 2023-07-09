/*
  Warnings:

  - You are about to drop the column `managerMemo` on the `ProjectInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectInfo" DROP COLUMN "managerMemo",
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "memo" TEXT;
