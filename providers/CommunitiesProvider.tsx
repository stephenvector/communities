import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { CommunitiesContext } from "../contexts";
import { Community, FetchStatus } from "../types";

const CommunitiesProvider: React.FC = ({ children }) => {
  const [communities, setCommunities] = useState<Record<string, Community>>({});
  const [status, setStatus] = useState<FetchStatus>("initial");

  useEffect(() => {
    setStatus("loading");
    const unsubscribe = firebase
      .firestore()
      .collection("communities")
      .onSnapshot(
        (snapshot) => {
          const newCommunities: Record<string, Community> = {};

          snapshot.forEach((docSnapshot) => {
            const docData = docSnapshot.data();

            if (
              typeof docData === "object" &&
              "name" in docData &&
              "description" in docData
            ) {
              newCommunities[docSnapshot.id] = {
                name: docData.name,
                description: docData.description,
              };
            }
          });

          setCommunities(newCommunities);
          setStatus("success");
        },
        () => {
          setStatus("error");
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <CommunitiesContext.Provider value={{ communities, status }}>
      {children}
    </CommunitiesContext.Provider>
  );
};

export default CommunitiesProvider;
