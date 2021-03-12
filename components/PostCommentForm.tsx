import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/firestore";
import { Box, Button, Label, Textarea } from "./";
import { useAuth } from "../hooks";
import { Comment } from "../types";

type PostCommentFormProps = {
  postId: string;
  communityId: string;
};

const PostCommentForm: React.FC<PostCommentFormProps> = ({
  postId,
  communityId,
}) => {
  const { signedIn, currentUser } = useAuth();
  const { handleSubmit, register, formState } = useForm<{
    comment: string;
  }>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = useCallback(
    async (values: { comment: string }) => {
      if (currentUser) {
        const newComment: Comment = {
          userId: currentUser.uid,
          postId,
          communityId,
          comment: values.comment,
          date: firebase.firestore.Timestamp.now().toDate(),
        };
        await firebase.firestore().collection("comments").doc().set(newComment);
      }
    },
    [currentUser, postId, communityId]
  );

  if (!signedIn) return <div>Sign In to leave a comment</div>;

  return (
    <Box>
      <h3>Leave A Comment</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="comment">Your Thoughts</Label>
        <Textarea
          disabled={formState.isSubmitting}
          id="comment"
          name="comment"
          ref={register}
        />
        <Button disabled={formState.isSubmitting} type="submit">
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

export default PostCommentForm;
