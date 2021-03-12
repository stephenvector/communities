import { createContext } from "react";
import firebase from "firebase/app";

type AuthContextValue = {
  signedIn: boolean;
  currentUser: firebase.User | null;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  updateProfile: (values: { displayName: string }) => Promise<void>;
};

const DEFAULT_CONTEXT_VALUE: AuthContextValue = {
  signedIn: false,
  currentUser: null,
  signOut: () => {},
  signIn: async () => {},
  signUp: async () => {},
  updateProfile: async () => {},
};

const AuthContext = createContext(DEFAULT_CONTEXT_VALUE);

export default AuthContext;
