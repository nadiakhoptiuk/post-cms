import { getPostById } from "~/shared/.server/repository/posts";
import type { Route } from "./+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.postId) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = await getPostById(Number(params.postId));

  if (!post) {
    throw new Response("Not found", { status: 404 });
  }

  return { post };
}
