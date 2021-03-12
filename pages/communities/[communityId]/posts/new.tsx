import React, { useCallback, useMemo } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  Label,
  Input,
  Button,
  Loading,
  Error,
  NotFound,
  NeedToLogin,
  Textarea,
  Box,
  Container,
  PageTitle,
} from "../../../../components";
import { useAuth, useCommunities } from "../../../../hooks";
import { Community as CommunityType } from "../../../../types";

const NewPost: React.FC<{ communityId: string }> = ({ communityId }) => {
  const router = useRouter();
  const { signedIn, currentUser } = useAuth();
  const { communities, status } = useCommunities();

  const community: null | CommunityType = useMemo(() => {
    if (communityId in communities) return communities[communityId];

    return null;
  }, [communities, communityId]);

  const { handleSubmit, register, formState } = useForm<{
    title: string;
    content: string;
  }>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = useCallback(
    async (values: { title: string; content: string }) => {
      const { title, content } = values;
      const newDocRef = firebase.firestore().collection("posts").doc();
      await newDocRef.set({
        title,
        content,
        communityId,
        date: firebase.firestore.Timestamp.now().toDate(),
        userId: currentUser ? currentUser.uid : "",
      });
      router.replace(`/communities/${communityId}/posts/${newDocRef.id}`);
    },
    [communityId, currentUser, router]
  );

  if (!signedIn) return <NeedToLogin />;

  if (status === "loading") return <Loading />;

  if (status === "error") return <Error />;

  if (community === null) return <NotFound />;

  return (
    <Container>
      <Box>
        <PageTitle>Create A New Post</PageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Title</Label>
          <Input
            disabled={formState.isSubmitting}
            type="text"
            id="title"
            name="title"
            ref={register}
          />

          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            ref={register}
            disabled={formState.isSubmitting}
          />

          <Button disabled={formState.isSubmitting} type="submit">
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      communityId: context.params?.communityId,
    },
  };
}

export default NewPost;
