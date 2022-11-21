import React, { useEffect } from "react";
import { supabase } from "../supabase-client";
import { useAuthContext } from "./AuthContextProvider";

const LogInOutButton = () => {
  const { user, dispatch } = useAuthContext();

  function logOut() {
    /* sign the user out */
    supabase.auth.signOut().then(() => {
      dispatch({ type: "logout" });
    });
  }

  const logIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3001/newprojects",
      },
    });
  };

  useEffect(() => {
    const getUser = async () => {
      return await supabase.auth.getUser();
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
            <button onClick={() => logOut()}>Log In</button>
          ) : (
            <button onClick={() => logIn()}>Log Out</button>
          )}
        </span>
      )}
    </div>
  );
};

export default LogInOutButton;
