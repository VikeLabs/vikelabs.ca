import { useRouter } from "next/router";
import React from "react";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { useAuthContext } from "./AuthContextProvider";
import BlogDashboard from "./BlogDashboard";
import Container from "./Container";
import CreateAccountCard from "./CreateAccountCard";
import { NavigationButton } from "./Navigation";
import Wrapper from "./Wrapper";

const DashboardWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const { user } = useAuthContext();
  const loggedInUser = useLoggedInUser(user?.id, user?.token);

  const router = useRouter();
  let allowed = true;
  if (router.pathname.startsWith("/dashboard/admin") && loggedInUser.data?.role !== "admin") {
    allowed = false;
  }
  if (
    router.pathname.startsWith("/dashboard/lead") &&
    !(loggedInUser.data?.role === "lead" || loggedInUser.data?.role === "admin")
  ) {
    allowed = false;
  }
  if (router.pathname.startsWith("/dashboard/member") && !user) {
    allowed = false;
  }

  return (
    <Wrapper hasFooter={false}>
      {!loggedInUser.isLoading && user && !loggedInUser.data ? (
        <CreateAccountCard />
      ) : (
        <>
          {allowed ? (
            <>
              <Container>
                <div className="bg-slate-300 p-4">{title} Dashboard</div>
              </Container>
              {(loggedInUser.data?.role === "lead" || loggedInUser.data?.role === "admin") && (
                <nav>
                  <ul className="flex flex-col justify-center items-center space-y-2 md:flex-row md:space-x-8 md:space-y-0 font-bold text-center group text-lg md:text-base">
                    <NavigationButton name="Member" path="/dashboard/member" key="member" />
                    <NavigationButton name="Lead" path="/dashboard/lead" key="lead" />
                    {loggedInUser.data?.role === "admin" && (
                      <NavigationButton name="Admin" path="/dashboard/admin" key="admin" />
                    )}
                  </ul>
                </nav>
              )}
              <Container>
                <div className="bg-slate-100 p-4">{children}</div>
              </Container>
              <BlogDashboard />
            </>
          ) : (
            <Container>
              <div className="bg-slate-100 p-4">unauthorized</div>
            </Container>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default DashboardWrapper;
