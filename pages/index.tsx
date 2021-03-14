import React from "react";
import getHomePageData, { HomePageData } from "../lib/getHomePageData";
import { Container, PostListing } from "../components";

const Home: React.FC<HomePageData> = ({ posts, communities, users }) => {
  return (
    <Container>
      <h1>Recent posts</h1>
      {Object.entries(posts).map(([postId, post]) => {
        const postCommunity = communities[post.communityId]
          ? communities[post.communityId]
          : undefined;
        const userDisplayName = users[post.userId]
          ? users[post.userId]
          : post.userId;
        return (
          <PostListing
            key={postId}
            post={post}
            postId={postId}
            community={postCommunity}
            userDisplayName={userDisplayName}
          />
        );
      })}
    </Container>
  );
};

export async function getServerSideProps() {
  const homePageData = await getHomePageData();

  return {
    props: homePageData,
  };
}

export default Home;
