import React from "react";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import getCommunities from "../lib/getCommunities";
import { Box, Container, ButtonLink } from "../components";

const Communities: React.FC<{
  communities: ReturnType<typeof getCommunities>;
}> = ({ communities }) => {
  return (
    <Container>
      <h1>Communities</h1>
      <ButtonLink href="/communities/new">New Community</ButtonLink>

      {Object.entries(communities).map(([communityId, community]) => (
        <Box key={communityId}>
          <Link href={`/communities/${communityId}`}>
            <h3>{community.name}</h3>
          </Link>
          <div>{community.description}</div>
        </Box>
      ))}
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const communities = await getCommunities();
  return {
    props: {
      communities,
    },
  };
}

export default Communities;
