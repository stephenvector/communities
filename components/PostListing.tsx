import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Post, Community } from "../types";
import { DisplayDate } from "./";

const StyledPostListing = styled.div`
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  grid-gap: 0.6rem;
  a {
    color: inherit;
    text-decoration: none;
  }
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 80%;
    color: #888;
  }
`;

type PostListingProps = {
  postId: string;
  post: Post;
  community?: Community;
  userDisplayName?: string;
};

const PostListing: React.FC<PostListingProps> = ({
  postId,
  post,
  community,
  userDisplayName,
}) => {
  return (
    <StyledPostListing>
      <h3>
        <Link href={`/communities/${post.communityId}/posts/${postId}/`}>
          {post.title}
        </Link>
      </h3>
      {community && userDisplayName && (
        <p>
          Posted in{" "}
          <Link href={`/communities/${post.communityId}`}>
            {community.name}
          </Link>{" "}
          by <span>{userDisplayName}</span> on{" "}
          <DisplayDate dateToDisplay={post.date} />
        </p>
      )}
    </StyledPostListing>
  );
};

export default PostListing;
