import { useRouter } from "next/router";
import React, { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext(null);

// TODO:  These needs work, set this to specifically contain token, oAuthId, and id.
export type AuthState = {
  name: string;
  email: string;
  photoUrl: string;
  token: string;
} | null;

export type RealAuthState = {
  user: {};
  token: string;
};

export const authReducer = (state: AuthState, action) => {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};
// TODO: Change the names "userSession" to "auth"

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: "loading",
  });
  // logs everytime the state is changed
  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// context hook

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};
