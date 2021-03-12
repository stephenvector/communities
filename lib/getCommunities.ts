import firebase from "firebase/app";
import "firebase/firestore";
import { Community } from "../types";

export default async function getCommunities() {
  const communities = await firebase
    .firestore()
    .collection("communities")
    .get()
    .then((snapshot) => {
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

      return newCommunities;
    });
  return communities;
}
