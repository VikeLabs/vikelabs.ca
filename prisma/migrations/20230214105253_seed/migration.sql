-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'member', 'lead', 'admin');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('saved', 'savedReview', 'submitted', 'rejected', 'approved');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "vId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT DEFAULT '',
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "github" TEXT DEFAULT '',
    "discord" TEXT DEFAULT '',
    "imageUrl" TEXT DEFAULT '',
    "role" "Role" NOT NULL DEFAULT 'member',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "liveId" TEXT,
    "draftId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInfo" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'savedReview',
    "title" TEXT NOT NULL,
    "recruiting" BOOLEAN NOT NULL,
    "recruitingFor" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "stack" JSONB NOT NULL,
    "links" JSONB NOT NULL,
    "imageUrls" JSONB NOT NULL,
    "members" JSONB NOT NULL,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "managedBy" TEXT,
    "managedAt" TIMESTAMP(3),
    "managerMemo" TEXT,

    CONSTRAINT "ProjectInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectHasMembers" (
    "projectId" INTEGER NOT NULL,
    "memberId" TEXT NOT NULL,
    "isCredited" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT,

    CONSTRAINT "ProjectHasMembers_pkey" PRIMARY KEY ("projectId","memberId")
);

-- CreateTable
CREATE TABLE "ProjectHasLead" (
    "projectId" INTEGER NOT NULL,
    "leadId" TEXT NOT NULL,
    "isCredited" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProjectHasLead_pkey" PRIMARY KEY ("projectId","leadId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Project_liveId_key" ON "Project"("liveId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_draftId_key" ON "Project"("draftId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectHasLead_projectId_key" ON "ProjectHasLead"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectHasLead_leadId_key" ON "ProjectHasLead"("leadId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_liveId_fkey" FOREIGN KEY ("liveId") REFERENCES "ProjectInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "ProjectInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasMembers" ADD CONSTRAINT "ProjectHasMembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasMembers" ADD CONSTRAINT "ProjectHasMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasLead" ADD CONSTRAINT "ProjectHasLead_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHasLead" ADD CONSTRAINT "ProjectHasLead_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
