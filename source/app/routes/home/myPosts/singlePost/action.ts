import { NavigationLink } from "~/shared/constants/navigation";
import { updatePostAction } from "~/shared/.server/utils/postUtils";

import type { Route } from "../../+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  const postId = params.postId;

  if (!postId) {
    throw new Response("Not Found", { status: 404 });
  }

  return await updatePostAction(
    request,
    Number(postId),
    NavigationLink.MY_POSTS
  );
}
