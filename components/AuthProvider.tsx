import React, { useState, useEffect, createContext, useReducer, useContext, Context, ReactNode } from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { useRouter } from 'next/router';

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
});
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

/*
  {
    name: result.user.displayName,
    email: result.user.email,
    photoURL: result.user.photoURL,
    token: credential.accessToken,
  }
*/
export const AuthContext = createContext(null)

export type AuthState = {
  name: string,
  email: string,
  photoUrl: string,
  token: string,
} | null;

export const authReducer = (state: AuthState, action) => {
  switch (action.type) {
    case "login":
      return {user: action.payload};
    case "logout":
      return {user: null};
    default:
      return state;
  }
}
// TODO: Change the names "userSession" to "auth"

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });
  // logs everytime the state is changed
  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

// context hook

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }
  return context;
}

// export const AuthUserProvider = ({children}: {children: ReactNode}) => {
//   const session = JSON.parse(localStorage.getItem("auth"))

//   const [sessionState, setSessionState] = React.useState({
//     token: "",
//   });
 
//   const setUserAuthInfo = ({ data }) => {
//     const token = localStorage.setItem("token", data.data);
//     setSessionState({
//       token,
//     });

//   return <UserSessionContext.Provider value={session}>{children}</UserSessionContext.Provider>
// }

// export const useAuth = () => useContext(UserSessionContext);