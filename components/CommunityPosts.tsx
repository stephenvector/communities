import React, { useEffect, useState } from "react";
import Link from "next/link";
import firebase from "firebase/app";
import "firebase/firestore";
import { Post } from "../types";
import Box from "./Box";

type CommunityPostsProps = {
  communityId: string;
};

const CommunityPosts: React.FC<CommunityPostsProps> = ({ communityId }) => {
  const [posts, setPosts] = useState<Record<string, Post>>({});

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("communityId", "==", communityId)
      .onSnapshot((snapshot) => {
        const newPosts: Record<string, Post> = {};

        snapshot.forEach((doc) => {
          const docData = doc.data();

          newPosts[doc.id] = {
            communityId,
            title: docData.title,
            content: docData.content,
            userId: docData.userId,
            date: docData.date.toDate(),
          };
        });

        console.log(newPosts);

        setPosts(newPosts);
      });
  }, [communityId]);

  return (
    <div>
      {Object.entries(posts).map(([postId, post]) => (
        <Box key={postId}>
          <Link href={`/communities/${communityId}/posts/${postId}`}>
            {post.title}
          </Link>
        </Box>
      ))}
    </div>
  );
};

export default CommunityPosts;
