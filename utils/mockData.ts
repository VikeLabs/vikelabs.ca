import { ImageInfo, LinkTag, MemberInfo, TechTag } from "../types";

type mockData = {
  memberInfo: MemberInfo[];
  stack: TechTag[];
  links: LinkTag[];
  images: ImageInfo[];
};

export const mockData = {
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
  links: [
    {
      label: "Website",
      color: "blackAlpha",
      url: "https://github.com/VikeLabs/vikelabs.ca",
    },
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
  images: [
    { aria: "grey cat", url: "https://placekitten.com/400/400" },
    { aria: "grey cat", url: "https://placekitten.com/500/400" },
    { aria: "grey cat", url: "https://placekitten.com/400/400" },
  ],
};
