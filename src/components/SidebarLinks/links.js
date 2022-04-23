import React from 'react'
import { HiOutlineCode, HiOutlineUserGroup, HiOutlineHome, HiOutlineBookOpen } from "react-icons/hi"
import { FaGithub, FaDiscord } from 'react-icons/fa'

export const internalLinks = [
  {
    label: "$HOME",
    icon: <HiOutlineHome />,
    link: "/"
  },
  {
    label: "About",
    icon: <HiOutlineUserGroup />,
    link: "/about"
  },
  {
    label: "Projects",
    icon: <HiOutlineCode />,
    link: "/p"
  },
  {
    label: "Blog",
    icon: <HiOutlineBookOpen />,
    link: "/b"
  }
]
export const externalLinks = [
  {
    label: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/vikelabs/",
  },
  {
    label: "Discord",
    icon: <FaDiscord />,
    link: "https://discord.gg/FcpU2Xm5dD",
  },
]