import Link from "next/link";
import React from "react";
import { useAuthContext } from "./AuthContextProvider";
import LogInOutButton from "./LogInOutButton";

// Refactor this to config
type NavigationPath = {
  name: string;
  path: string;
};

const navigationPaths: NavigationPath[] = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Projects", path: "/projects" },
  // { name: "Blog", path: "/blog" },
];

export const NavigationBar = () => {
  const { user } = useAuthContext();
  return (
    <nav>
      <ul className="flex flex-col justify-center items-center space-y-2 md:flex-row md:space-x-8 md:space-y-0 font-bold text-center group text-lg md:text-base">
        {navigationPaths.map((page: NavigationPath) => (
          <NavigationButton name={page.name} path={page.path} key={page.path} />
        ))}
        {user && <NavigationButton name="Dashboard" path="/dashboard" key="/dashboard" />}
        <li className="py-2 md:py-0 cursor-pointer">
          <LogInOutButton />
        </li>
      </ul>
    </nav>
  );
};

export const NavigationButton = ({ name, path }: { name: string; path: string }) => {
  return (
    <li className="py-2 cursor-pointer">
      <Link href={path}>{name}</Link>
    </li>
  );
};
