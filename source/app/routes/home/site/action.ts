import {
  complaintAboutPost,
  getOnlyAnotherUserPostById,
  getPostById,
} from "~/shared/.server/repository/posts";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type { Route } from "./+types/route";
import { authGate } from "~/shared/.server/services/auth";
import type { TSerializedUser } from "~/shared/types/react";
import { NavigationLink } from "~/shared/constants/navigation";
import { data } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();
      const postId = formData.get("postId");
      const complaintReason = formData.get("complaintReason");

      if (typeof postId !== "string" || typeof complaintReason !== "string") {
        throw new Error("Reason or postId is not a string");
      }

      const existingPost = await getPostById(Number(postId));
      if (!existingPost) {
        throw data("Post with such id does not exist", { status: 404 });
      }

      const existingAnotherUserPost = await getOnlyAnotherUserPostById(
        sessionUser.id,
        Number(postId)
      );
      if (!existingAnotherUserPost) {
        throw data("Permitted operation for your own post", { status: 403 });
      }

      return await complaintAboutPost(
        Number(postId),
        { complaintReason: complaintReason },
        sessionUser.id
      );
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

// const formData = await request.formData();
// const postId = formData.get("postId");
// const complaintReason = formData.get("complaintReason");

// if (typeof postId !== "string" || typeof complaintReason !== "string") {
//   return Response.json({
//     error: "Reason or postId is not a string",
//   });
// }

// const session = await getSession(request.headers.get("cookie"));
// const sessionUser = session.get(SESSION_USER_KEY);

// // if (!sessionUser) {
// // TODO
// // }

// try {
// const existingUser = await getUserById(sessionUser.id);
// if (!existingUser) {
//   throw new Error("User with such id does not exist");
// }

//     const existingPost = await getPostById(Number(postId));
//     if (!existingPost) {
//       throw new Error("Post with such id does not exist");
//     }

//     const existingAnotherUserPost = await getOnlyAnotherUserPostById(
//       sessionUser.id,
//       Number(postId)
//     );
//     if (!existingAnotherUserPost) {
//       throw new Error("Permitted operation for your own post");
//     }

//     await complaintAboutPost(
//       Number(postId),
//       { complaintReason: complaintReason },
//       sessionUser.id
//     );
//   } catch (error) {
//     errorHandler(error);
//   }
// }
