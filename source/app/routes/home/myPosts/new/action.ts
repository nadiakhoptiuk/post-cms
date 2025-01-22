import { redirect } from "react-router";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

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
import {
  ROLE_ADMIN,
  ROLE_USER,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import type { Route } from "../../+types/route";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import { commitSession } from "~/shared/.server/services/session";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser, t, session) => {
      const formData = await request.formData();
      const { title, slug, content, tags } = getPostDataFromRequest(formData);

      const idForSlug = await generateUniqueIdForSlug();

      const { window: serverWindow } = new JSDOM("");
      const purify = DOMPurify(serverWindow);
      const sanitizedHTML = purify.sanitize(content);

      const createdPost = await createNewPost(sessionUser.id, {
        title,
        slug: `${slug}-${idForSlug}`,
        content: sanitizedHTML,
      });

      if (!createdPost) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      const tagsArr =
        tags === "" ? [] : tags.split(",").map((el) => ({ name: el }));

      if (tagsArr.length === 0) {
        session.set(SESSION_SUCCESS_KEY, t("notifications.success.created"));
        return redirect(NavigationLink.MY_POSTS, {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      }

      await createMultipleTagsOrSkip(tagsArr, sessionUser.id);

      for (const tag of tagsArr) {
        const existingTag = await getTagByName(tag.name);
        await addTagToPost(existingTag.id, createdPost.id);
      }

      session.set(SESSION_SUCCESS_KEY, t("notifications.success.created"));

      return redirect(NavigationLink.MY_POSTS, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
