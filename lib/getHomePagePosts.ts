import firebase from "firebase/app";
import "firebase/firestore";
import { Post } from "../types";

export default async function getHomePagePosts() {
  const posts = await firebase
    .firestore()
    .collection("posts")
    .orderBy("date", "desc")
    .limit(10)
    .get()
    .then((snapshot) => {
      const posts: Record<string, Post> = {};

      snapshot.forEach((docSnapshot) => {
        const docData = docSnapshot.data();

        console.log(docData);

        if (
          typeof docData === "object" &&
          "communityId" in docData &&
          "userId" in docData &&
          "title" in docData &&
          "content" in docData &&
          "date" in docData
        ) {
          try {
            const post = {
              communityId: docData.communityId,
              userId: docData.userId,
              title: docData.title,
              content: docData.content,
              date: (docData.date as firebase.firestore.Timestamp)
                .toDate()
                .toString(),
            };
            posts[docSnapshot.id] = post;
          } catch (e) {
            console.log(e);
          }
        }
      });

      return posts;
    });
  return posts;
}
