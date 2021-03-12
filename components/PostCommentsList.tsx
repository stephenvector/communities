import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Comment } from "../types";
import Box from "./Box";

type PostCommentsListProps = {
  postId: string;
};

const PostCommentsList: React.FC<PostCommentsListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Record<string, Comment>>({});
  useEffect(() => {
    firebase
      .firestore()
      .collection("comments")
      .where("postId", "==", postId)
      .onSnapshot((snapshot) => {
        const newComments: Record<string, Comment> = {};

        snapshot.forEach((docSnapshot) => {
          const docData = docSnapshot.data();

          newComments[docSnapshot.id] = {
            communityId: docData.communityId,
            comment: docData.comment,
            date: docData.date.toDate(),
            userId: docData.userId,
            postId,
          };
        });

        setComments(newComments);
      });
  }, [postId]);

  return (
    <div>
      {Object.entries(comments)
        .sort(([commentId, comment]) => comment.date.valueOf())
        .map(([commentId, comment]) => (
          <Box key={commentId}>
            <div>{comment.date.toLocaleDateString()}</div>
            {comment.comment}
          </Box>
        ))}
    </div>
  );
};

export default PostCommentsList;
