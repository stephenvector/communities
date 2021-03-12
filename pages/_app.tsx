import React from "react";
import { AppProps } from "next/app";
import { AppHeader, GlobalStyles } from "../components";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { AuthProvider, CommunitiesProvider } from "../providers";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <AuthProvider>
        <CommunitiesProvider>
          <div>
            <GlobalStyles />
            <AppHeader />
            <section>
              <Component {...pageProps} />
            </section>
          </div>
        </CommunitiesProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
