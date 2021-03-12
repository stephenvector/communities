import React, { useMemo } from "react";
import { GetServerSidePropsContext } from "next";
import { useCommunities } from "../../hooks";
import { Community as CommunityType } from "../../types";
import {
  Container,
  Loading,
  NotFound,
  Error,
  CommunityPosts,
  ButtonLink,
} from "../../components";

const Community: React.FC<{ communityId: string }> = ({ communityId }) => {
  const { communities, status } = useCommunities();

  const community: null | CommunityType = useMemo(() => {
    if (communityId in communities) return communities[communityId];

    return null;
  }, [communities, communityId]);

  if (status === "loading") return <Loading />;

  if (status === "error") return <Error />;

  if (community === null) return <NotFound />;

  return (
    <Container>
      <h1>{community.name}</h1>
      <p>{community.description}</p>
      <ButtonLink href={`/communities/${communityId}/posts/new`}>
        Create A Post
      </ButtonLink>
      <CommunityPosts communityId={communityId} />
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

export default Community;
