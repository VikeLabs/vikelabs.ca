import { ImageInfo, LinkTag, MemberInfo, TechTag } from "../types";

type mockData = {
  memberInfo: MemberInfo[];
  stack: TechTag[];
  presetStack: TechTag[];
  links: LinkTag[];
  images: ImageInfo[];
};

const mockData = {
  memberInfo: [
    {
      id: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
      username: "robchendev",
      displayName: "Robert Chen",
      imageUrl: "https://avatars.githubusercontent.com/u/66714443?v=4s",
      github: "robchendev",
      discord: "chend#1234",
    },
    { id: "128728912746712892", username: "someguy123" },
    { id: "128728912746712893", username: "someguy123" },
    { id: "128728912746712894", username: "someguy123" },
    { id: "128728912746712895", username: "someguy123" },
    { id: "128728912746712896", username: "someguy123" },
  ],
  stack: [
    { label: "TypeScript", color: "blue" },
    { label: "React", color: "cyan" },
    { label: "Go", color: "teal" },
    { label: "Python", color: "orange" },
  ],
  presetStack: [
    { label: "TypeScript", color: "blue" },
    { label: "JavaScript", color: "yellow" },
    { label: "C", color: "pink" },
    { label: "C++", color: "green" },
    { label: "BrainFk", color: "purple" },
    { label: "React", color: "cyan" },
    { label: "Go", color: "teal" },
    { label: "Python", color: "orange" },
  ],
  links: [
    {
      label: "GitHub",
      color: "purple",
      url: "https://github.com/VikeLabs/vikelabs.ca",
    },
    {
      label: "Android",
      color: "green",
      url: "https://github.com/VikeLabs/vikelabs.ca",
    },
    {
      label: "iOS",
      color: "blue",
      url: "https://github.com/VikeLabs/vikelabs.ca",
    },
  ],
  presetLinks: [
    {
      label: "GitHub",
      color: "purple",
      url: "",
    },
    {
      label: "Android",
      color: "green",
      url: "",
    },
    {
      label: "iOS",
      color: "blue",
      url: "",
    },
  ],
  images: [
    {
      aria: "courseup-home",
      url: "https://mvhzkbtvqchhjmqkqokr.supabase.co/storage/v1/object/public/projects/3/courseup-home.jpg",
    },
    {
      aria: "courseup-timetable",
      url: "https://mvhzkbtvqchhjmqkqokr.supabase.co/storage/v1/object/public/projects/3/courseup-timetable.jpg",
    },
    {
      aria: "courseup-viewer",
      url: "https://mvhzkbtvqchhjmqkqokr.supabase.co/storage/v1/object/public/projects/3/courseup-viewer.jpg",
    },
  ],
};

export { mockData };
