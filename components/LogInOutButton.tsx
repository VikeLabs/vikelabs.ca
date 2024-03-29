import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { supabase } from "../supabase-client";
import { useAuthContext } from "./AuthContextProvider";
import Loading from "./Loading";

const LogInOutButton = () => {
  const { auth } = supabase;
  const router = useRouter();
  const { user, dispatch } = useAuthContext();
  function logOut() {
    /* sign the user out */
    auth
      .signOut()
      .then(() => {
        dispatch({ type: "logout" });
        // eslint-disable-next-line
        router.push("/");
      })
      .catch((err) => console.log(err));
  }

  // TODO: https://supabase.com/docs/guides/auth/overview#redirect-urls-and-wildcards
  const getURL = () => {
    let url =
      // TODO: Need to set staging and production urls here
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3001";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  // The actual signin part
  const logInDiscord = () => {
    auth
      .signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: `${getURL()}/dashboard`,
        },
      })
      .catch((err) => console.log(err));
  };

  const logInGithub = () => {
    auth
      .signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${getURL()}/dashboard`,
        },
      })
      .catch((err) => console.log(err));
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
    getUser()
      .then((userSession) => {
        if (userSession.user.token) {
          dispatch({ type: "login", payload: userSession.user });
        } else {
          dispatch({ type: "logout" });
        }
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {user?.isLoading ? (
        <Loading />
      ) : (
        <span>
          {user ? (
            <button onClick={() => logOut()}>Log Out</button>
          ) : (
            <span>
              <button onClick={() => logInDiscord()}>Discord Login</button>
              <button onClick={() => logInGithub()}>Github Login</button>
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default LogInOutButton;
