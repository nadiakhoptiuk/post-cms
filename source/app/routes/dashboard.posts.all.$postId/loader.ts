import { getPostById } from "~/shared/.server/repository/posts";

import type { Route } from "../../+types/root";

export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.postId;

  if (!postId) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = await getPostById(Number(postId));

  if (!post) {
    throw new Response("Not found", { status: 404 });
  }

  return { post };
}
