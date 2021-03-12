import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import firebase from "firebase/app";
import "firebase/firestore";
import { Post as PostType, FetchStatus } from "../../../../types";
import { useCommunity } from "../../../../hooks";
import {
  PostCommentForm,
  PostCommentsList,
  Loading,
  Container,
  PageTitle,
} from "../../../../components";

const Post: React.FC<{
  communityId: string;
  postId: string;
}> = ({ communityId, postId }) => {
  const [post, setPost] = useState<PostType | null>(null);
  const [postStatus, setPostStatus] = useState<FetchStatus>("initial");
  const { community, status: communityStatus } = useCommunity(communityId);

  useEffect(() => {
    setPostStatus("loading");
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .get()
      .then(
        (docSnapshot) => {
          const docData = docSnapshot.data();
          console.log(docData);
          if (
            docData &&
            "title" in docData &&
            "content" in docData &&
            "userId" in docData
          ) {
            setPost({
              title: docData.title,
              content: docData.content,
              communityId: docData.communityId,
              userId: docData.userId,
              date: docData.date.toDate(),
            });
            setPostStatus("success");
          }
        },
        () => {
          setPostStatus("error");
        }
      );
  }, [communityId, postId]);

  if (
    postStatus === "loading" ||
    postStatus === "initial" ||
    communityStatus === "initial" ||
    communityStatus === "loading"
  ) {
    return <Loading />;
  }

  if (post === null || community === null) return null;

  return (
    <Container>
      <PageTitle>{post.title}</PageTitle>
      <div>
        Posted in{" "}
        <Link href={`/communities/${communityId}`}>{community.name}</Link>
      </div>
      <p>{post.content}</p>

      <h3>Comments</h3>

      <PostCommentForm postId={postId} communityId={communityId} />

      <PostCommentsList postId={postId} />
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      communityId: context.params?.communityId,
      postId: context.params?.postId,
    },
  };
}

export default Post;
