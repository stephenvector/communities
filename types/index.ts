import firebase from "firebase/app";
import "firebase/firestore";

export type Community = {
  name: string;
  description: string;
};

export type Post = {
  communityId: string;
  userId: string;
  title: string;
  date: Date | string | firebase.firestore.Timestamp;
  content: string;
};

export type UserProfile = {
  displayName: string;
  bio: string;
};

export type Comment = {
  communityId: string;
  comment: string;
  date: Date | string;
  userId: string;
  postId: string;
};

export type FetchStatus = "initial" | "loading" | "success" | "error";
