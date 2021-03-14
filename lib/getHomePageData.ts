import getHomePagePosts from "./getHomePagePosts";
import getCommunities from "./getCommunities";
import getUsers from "./getUsers";
import { Post, Community } from "../types";

export type HomePageData = {
  posts: Record<string, Post>;
  users: Record<string, string>;
  communities: Record<string, Community>;
};

export default async function getHomePageData(): Promise<HomePageData> {
  const [posts, communities] = await Promise.all([
    getHomePagePosts(),
    getCommunities(),
  ]);

  const userIds: string[] = [];

  Object.values(posts).forEach((post) => {
    if (userIds.indexOf(post.userId) === -1) {
      userIds.push(post.userId);
    }
  });

  const users = await getUsers(userIds);

  return {
    posts,
    users,
    communities,
  };
}
