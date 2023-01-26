-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MEMBER', 'LEAD', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "vId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "draftId" TEXT NOT NULL,
    "liveId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInfo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "links" JSONB NOT NULL,
    "stack" JSONB NOT NULL,
    "imageUrls" JSONB NOT NULL,
    "recruiting" BOOLEAN NOT NULL,
    "recruitingFor" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "ProjectInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectHasMembers" (
    "projectId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "isCredited" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProjectHasMembers_pkey" PRIMARY KEY ("projectId","memberId")
);

-- CreateTable
CREATE TABLE "ProjectHasLead" (
    "projectId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "isCredited" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProjectHasLead_pkey" PRIMARY KEY ("projectId","leadId")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_draftId_key" ON "Project"("draftId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_liveId_key" ON "Project"("liveId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectHasLead_projectId_key" ON "ProjectHasLead"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectHasLead_leadId_key" ON "ProjectHasLead"("leadId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "ProjectInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_liveId_fkey" FOREIGN KEY ("liveId") REFERENCES "ProjectInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasMembers" ADD CONSTRAINT "ProjectHasMembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasMembers" ADD CONSTRAINT "ProjectHasMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasLead" ADD CONSTRAINT "ProjectHasLead_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasLead" ADD CONSTRAINT "ProjectHasLead_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
