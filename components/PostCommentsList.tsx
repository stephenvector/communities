import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import "firebase/firestore";
import { Comment } from "../types";
import { DisplayDate } from "./";

const StyledCommentsList = styled.div`
  background: #fff;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  .comment {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }
  .comment-date-info {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 0.5rem;
  }
  .comment:last-of-type {
    border-bottom: none;
  }
`;

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
    <StyledCommentsList>
      {Object.entries(comments)
        .sort(([commentId, comment]) => {
          return new Date(comment.date).valueOf() * -1;
        })
        .map(([commentId, comment]) => (
          <div className="comment" key={commentId}>
            <div className="comment-date-info">
              Comment posted on <DisplayDate dateToDisplay={comment.date} />
            </div>
            <div>{comment.comment}</div>
          </div>
        ))}
    </StyledCommentsList>
  );
};

export default PostCommentsList;
