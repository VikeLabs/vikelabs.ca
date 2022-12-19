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
      return await auth.getUser();
    };
    getUser().then((user) => {
      if (user?.data?.user) {
        dispatch({ type: "login", payload: user?.data?.user });
      } else {
        dispatch({ type: "logout" });
      }
    });
  }, []);

  return (
    <div>
      {user === "loading" && <p>loading</p>}
      {user !== "loading" && (
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
