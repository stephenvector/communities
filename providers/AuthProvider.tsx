import React, { useCallback, useEffect, useMemo, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { AuthContext } from "../contexts";

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        console.log(user);
        setCurrentUser(user);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const signedIn = useMemo(() => currentUser !== null, [currentUser]);

  const signOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (user.user) {
        await user.user.updateProfile({ displayName });
      }
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }, []);

  const updateProfile = useCallback(
    async (values: { displayName: string }) => {
      if (currentUser) {
        currentUser.updateProfile(values);
      }
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signedIn,
        signOut,
        signIn,
        signUp,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
