import React from "react";
import { BaseLayout as Layout } from "../layouts/base";
import { useAuthContext } from "./AuthContextProvider";
import BlogDashboard from "./BlogDashboard";
import Container from "./Container";
import { NavigationButton } from "./Navigation";
import Wrapper from "./wrapper";

type DashboardLink = {
  title: string;
  path: string;
};

const DashboardNavigation = ({ items }: { items: DashboardLink[] }) => {
  return (
    <nav>
      <ul className="flex flex-col justify-center items-center space-y-2 md:flex-row md:space-x-8 md:space-y-0 font-bold text-center group text-lg md:text-base">
        {items.map((item: DashboardLink) => (
          <NavigationButton
            name={item.title}
            path={item.path}
            key={item.path}
          />
        ))}
      </ul>
    </nav>
  );
};

const DashboardWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const dashboardLinks = [
    { title: "Member", path: "/dashboard/member" },
    { title: "Lead", path: "/dashboard/lead" },
    { title: "Admin", path: "/dashboard/admin" },
  ];
  const { user, dispatch } = useAuthContext();
  return (
    <Wrapper hasFooter={false}>
      <Container>
        <div className="bg-slate-300 p-4">{title} Dashboard</div>
      </Container>
      {user && user !== "loading" ? (
        <>
          <DashboardNavigation items={dashboardLinks} />
          <Container>
            <div className="bg-slate-100 p-4">{children}</div>
          </Container>
          <BlogDashboard />
        </>
      ) : (
        <Container>
          <div className="bg-slate-100 p-4">You are not signed in</div>
        </Container>
      )}
    </Wrapper>
  );
};

export default DashboardWrapper;
