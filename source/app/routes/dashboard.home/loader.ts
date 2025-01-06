import { getAllPosts } from "~/shared/.server/repository/posts";

import { getPostsWithSlicedString } from "~/shared/utils/getPostsWithSlicedString";

export async function loader() {
  const allPosts = await getAllPosts();

  return { posts: getPostsWithSlicedString(allPosts) };
}
