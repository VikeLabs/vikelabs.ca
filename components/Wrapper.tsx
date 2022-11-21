import React from "react";
import LogInOutButton from "./LogInOutButton";
import { NavigationBar } from "./Navigation";

const Wrapper = ({ children }) => {
  return (
    <>
      <header className="p-4 mx-auto md:w-10/12 fixed md:relative md:flex md:justify-between md:items-center md:text-center">
        VikeLabs
        <NavigationBar />
      </header>
      <main>{children}</main>
      <footer className="container flex items-center justify-center mx-auto h-32 text-center">
        Footer
      </footer>
    </>
  );
};

export default Wrapper;
