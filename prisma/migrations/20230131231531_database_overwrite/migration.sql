/*
  Warnings:

  - Added the required column `members` to the `ProjectInfo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `recruitingFor` on the `ProjectInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProjectHasMembers" ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "ProjectInfo" ADD COLUMN     "members" JSONB NOT NULL,
DROP COLUMN "recruitingFor",
ADD COLUMN     "recruitingFor" JSONB NOT NULL;
