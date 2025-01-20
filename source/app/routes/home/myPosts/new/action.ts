import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { createNewPost } from "~/shared/.server/repository/posts";
import { generateUniqueIdForSlug } from "~/shared/.server/utils/postUtils";
import { getPostDataFromRequest } from "~/shared/.server/utils/postUtils";
import {
  createMultipleTagsOrSkip,
  getTagByName,
} from "~/shared/.server/repository/tags";
import { addTagToPost } from "~/shared/.server/repository/postsToTags";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "../../+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();
      const { title, slug, content, tags } = getPostDataFromRequest(formData);

      const idForSlug = await generateUniqueIdForSlug();

      const createdPost = await createNewPost(sessionUser.id, {
        title,
        slug: `${slug}-${idForSlug}`,
        content,
      });

      if (!createdPost) {
        throw Error("Something went wrong");
      }

      const tagsArr =
        tags === "" ? [] : tags.split(",").map((el) => ({ name: el }));

      if (tagsArr.length === 0) {
        return redirect(NavigationLink.MY_POSTS);
      }

      await createMultipleTagsOrSkip(tagsArr, sessionUser.id);

      for (const tag of tagsArr) {
        const existingTag = await getTagByName(tag.name);
        await addTagToPost(existingTag.id, createdPost.id);
      }

      return redirect(NavigationLink.MY_POSTS);
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
