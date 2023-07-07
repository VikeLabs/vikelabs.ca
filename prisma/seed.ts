import { Role, Status, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const robert = await prisma.user.upsert({
    where: { id: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64" },
    update: {},
    create: {
      id: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
      vId: "V00892900",
      firstName: "Robert",
      lastName: "Chen",
      imageUrl: "https://avatars.githubusercontent.com/u/66714443?v=4",
      username: "robchendev",
      displayName: "Robert Chen",
      isCredited: true,
      role: Role.admin,
    },
  });
  const glenn = await prisma.user.upsert({
    where: { id: "0706feb7-1924-4ca6-9359-f8e634656803" },
    update: {},
    create: {
      id: "0706feb7-1924-4ca6-9359-f8e634656803",
      vId: "V12312312",
      username: "gquagmire",
      displayName: "Quagmire",
      firstName: "Glenn",
      lastName: "Quagmire",
      imageUrl: "https://i.pinimg.com/originals/aa/e8/92/aae892d46777024facfb01dabe88fd86.jpg",
      isCredited: false,
      role: Role.member,
    },
  });
  const vikelabsCaLive = await prisma.projectInfo.upsert({
    where: { id: "cldkvlf5g0000pj8oftlecthf" },
    update: {},
    create: {
      id: "cldkvlf5g0000pj8oftlecthf",
      status: Status.approved,
      title: "Vikelabs.ca",
      description: "<p>Live description</p>",
      recruiting: false,
      recruitingFor: ["FrontEnd Developer", "BackEnd Developer", "Pizza Eater"],
      stack: [
        { color: "blue", label: "TypeScript" },
        { color: "cyan", label: "React" },
        { color: "teal", label: "Go" },
        { color: "orange", label: "Python" },
      ],
      links: [
        {
          url: "https://github.com/VikeLabs/vikelabs.ca",
          color: "purple",
          label: "GitHub",
        },
        {
          url: "https://github.com/VikeLabs/vikelabs.ca",
          color: "green",
          label: "Android",
        },
        {
          url: "https://github.com/VikeLabs/vikelabs.ca",
          color: "blue",
          label: "iOS",
        },
      ],
      imageUrls: ["courseup-timetable.jpg", "courseup-viewer.jpg"],
      members: [
        {
          id: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
          role: "Front End Developer",
          isCredited: true,
        },
        {
          id: "0706feb7-1924-4ca6-9359-f8e634656803",
          role: "Back End Developer",
          isCredited: false,
        },
      ],
      updatedBy: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
      updatedAt: new Date(),
      managedBy: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
      managedAt: new Date(),
      memo: null,
      feedback: null,
    },
  });
  const vikelabsCaDraft = await prisma.projectInfo.upsert({
    where: { id: "cldwpzq5h0008pjf6ad0ikk8v" },
    update: {},
    create: {
      id: "cldwpzq5h0008pjf6ad0ikk8v",
      status: Status.submitted,
      title: "Vikelabs.ca",
      description: "<p>Draft description</p>",
      recruiting: true,
      recruitingFor: ["FrontEnd Developer", "BackEnd Developer", "Pizza Eater"],
      stack: [
        { color: "blue", label: "TypeScript" },
        { color: "cyan", label: "React" },
        { color: "teal", label: "Go" },
        { color: "orange", label: "Python" },
      ],
      links: [
        {
          url: "https://github.com/VikeLabs/vikelabs.ca",
          color: "purple",
          label: "GitHub",
        },
        {
          url: "https://github.com/VikeLabs/vikelabs.ca",
          color: "green",
          label: "Android",
        },
        {
          url: "https://github.com/VikeLabs/vikelabs.ca",
          color: "blue",
          label: "iOS",
        },
      ],
      imageUrls: ["courseup-timetable.jpg", "courseup-viewer.jpg", "2.png"],
      members: [
        {
          id: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
          role: "Front End Developer",
        },
        {
          id: "0706feb7-1924-4ca6-9359-f8e634656803",
          role: "Back End Developer",
        },
      ],
      updatedBy: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
      updatedAt: new Date(),
      managedBy: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
      managedAt: new Date(),
      memo: null,
      feedback: null,
    },
  });
  const vikelabsCa = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      order: 1,
      liveId: "cldkvlf5g0000pj8oftlecthf",
      draftId: "cldwpzq5h0008pjf6ad0ikk8v",
    },
  });
  const vikelabsCaHasLead = await prisma.projectHasLead.upsert({
    where: { projectId: 1 },
    update: {},
    create: {
      projectId: 1,
      leadId: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
    },
  });
  // const vikelabsCaMemberRobert = await prisma.projectHasMembers.upsert({
  //   where: { projectId: 1, memberId: "0706feb7-1924-4ca6-9359-f8e634656803" },
  //   update: {},
  //   create: {
  //     projectId: 1,
  //     memberId: "0706feb7-1924-4ca6-9359-f8e634656803",
  //   },
  // });
  // const vikelabsCaMemberGlenn = await prisma.projectHasMembers.upsert({
  //   where: { projectId: 1, memberId: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64" },
  //   update: {},
  //   create: {
  //     projectId: 1,
  //     memberId: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
  //   },
  // });
  console.log({
    robert,
    glenn,
    vikelabsCa,
    vikelabsCaHasLead,
    vikelabsCaLive,
    vikelabsCaDraft,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
