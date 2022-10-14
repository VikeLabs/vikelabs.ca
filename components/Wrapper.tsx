import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import NavBar, { NavigationLink } from "./NavBar";
import SocialIcons, { SocialIcon } from "./SocialIcons";
import { FaDiscord } from "react-icons/fa";
import config from "../config/config";
import { AuthContext, AuthContextProvider, useAuthContext } from "./AuthProvider";

import { getAuth, signInWithPopup, GithubAuthProvider, OAuthCredential } from "firebase/auth";
import { useRouter } from "next/router";

const provider = new GithubAuthProvider();

const Layout = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.main`
  display: block;
  flex: 1 0 auto;
  padding: var(--lg);
`;

const Header = styled.div`
  padding: var(--lg);
`;

const HeaderContent = styled.div`
  padding-bottom: var(--lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  max-height: 2.5em;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 calc(2 * var(--lg)) calc(2 * var(--lg));
`;

const FooterContent = styled.div`
  padding-top: calc(2 * var(--lg));
  border-top: 1px solid var(--black);
`;

const Sponsors = styled.div`
  display: flex;
  justify-content: center;
`;



const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const navLinks: NavigationLink[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/newprojects" },
    { name: "Sandbox", path: "/sandbox" },
  ];
  const socialIcons: SocialIcon[] = [
    { icon: <FaDiscord />, url: `https://discord.gg/${config.discord_invite_code}` },
    { icon: <></>, url: "https://googles.com" },
  ];
  const router = useRouter();
  const auth = getAuth();
  const {user, dispatch} = useAuthContext();

  const githubSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const authPersist = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        token: credential.accessToken,
      }
      localStorage.setItem("auth", JSON.stringify(authPersist))
      // setUserSession(localStorage.getItem("auth"))
      dispatch({type: "login", payload: JSON.parse(localStorage.getItem("auth"))})
      router.push("/dashboard")
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData?.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      console.log("ERROR IN SIGNIN", error)
    });
  } 

  // See if user is signed in or not
  // const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    // setUserSession(localStorage.getItem("auth"))
    // console.log("USER SESSION: ",userSession);
  }, [])

  const logOut = () => {
    auth.signOut;
    localStorage.removeItem("auth")
    dispatch({type: "logout"})
    // setUserSession(null)
  }

  return (
    <Layout>
      {/* Create context provider wrapper with the above functions */}
      <Header>
        <HeaderContent>
          <Logo src="../img/logo.png" />
          <NavBar navLinks={navLinks} />
        </HeaderContent>
      </Header>
      {/* Refactor to new Login.tsx component */}
      {user && user.token
        ? <button onClick={logOut}>SIGNOUT</button>
        : <button onClick={githubSignIn}>SIGNIN</button> 
      }
      <Main>{children}</Main>
      <Footer>
        <FooterContent>
          <Sponsors>SPONSORS</Sponsors>
          <SocialIcons socialIcons={socialIcons} />
        </FooterContent>
      </Footer>
    </Layout>
  );
};

export default Wrapper;