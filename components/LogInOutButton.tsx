import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { supabase } from "../supabase-client";
import { useAuthContext } from "./AuthContextProvider";

const LogInOutButton = () => {
  const { auth } = supabase;
  const router = useRouter();
  const { user, dispatch } = useAuthContext();
  function logOut() {
    /* sign the user out */
    auth.signOut().then(() => {
      dispatch({ type: "logout" });
      router.push("/");
    });
  }

  const logIn = () => {
    auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3001/dashboard",
      },
    });
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await auth.getUser();
      const session = await auth.getSession();
      if (session.error) {
        throw new Error(session.error.message);
      }

      const userSession = {
        user: {
          ...user?.data?.user,
          token: session.data.session?.access_token,
        },
      };
      return userSession;
    };
    getUser().then((userSession) => {
      if (userSession.user.token) {
        dispatch({ type: "login", payload: userSession.user });
      } else {
        dispatch({ type: "logout" });
      }
    });
  });

  return (
    <div>
      {user === "loading" ? (
        <p>loading</p>
      ) : (
        <span>
          {user ? (
            <button onClick={() => logOut()}>Log Out</button>
          ) : (
            <button onClick={() => logIn()}>Log In</button>
          )}
        </span>
      )}
    </div>
  );
};

export default LogInOutButton;
