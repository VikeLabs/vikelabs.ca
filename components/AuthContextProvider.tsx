import React, { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext<AuthState>(null);

export type AuthState = {
  user?: {
    isLoading?: boolean;
    app_metadata: {
      provider: string;
      providers: string[];
    };
    id: string;
    token: string;
    aud: string;
    confirmed_at: string;
    created_at: string;
    email: string;
    email_confirmed_at: string;
    identities: {
      id: string;
      user_id: string;
      identity_data: {
        avatar_url: string;
        email: string;
        email_verified: boolean;
        full_name: string;
        iss: string;
        name: string;
        preferred_username: string;
        provider_id: string;
        sub: string;
        user_name: string;
      };
      last_sign_in_at: string;
      provider: string;
      updated_at: string;
    };
    last_sign_in_at: string;
    phone: string;
    role: string;
    updated_at: string;
    user_metadata: {
      avatar_url: string;
      email: string;
      full_name: string;
      iss: string;
      name: string;
      preferred_username: string;
      provider_id: string;
      sub: string;
      user_name: string;
    };
  };
  dispatch: any;
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

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: { isLoading: true },
  });
  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // console.log(context);
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};
