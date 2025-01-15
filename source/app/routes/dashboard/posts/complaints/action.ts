import {
  getActionIdFromRequest,
  getIdFromRequest,
} from "~/shared/.server/utils/commonUtils";
import { authGate } from "~/shared/.server/services/auth";
import {
  considerComplaint,
  getComplaintById,
} from "~/shared/.server/repository/complaints";
import type { TSerializedUser } from "~/shared/types/react";

import {
  ACTION_ACCEPT,
  ACTION_REJECT,
  POST_STATUS,
  ROLE_ADMIN,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";
import { getPostById } from "~/shared/.server/repository/posts";
import { acceptComplaintAction } from "./actions/accept";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    { isPublicRoute: false, allowedRoles: [ROLE_ADMIN] },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();

      const complaintId = Number(getIdFromRequest(formData));
      const existingComplaint = await getComplaintById(complaintId);
      if (
        !existingComplaint ||
        (existingComplaint && existingComplaint.status !== null)
      ) {
        throw Error(
          "Complaint with such id does not exist or has been already considered"
        );
      }

      const postId = Number(formData.get("postId"));
      const existingPost = await getPostById(postId);

      if (
        !existingPost ||
        (existingPost && existingPost.postStatus !== POST_STATUS.PUBLISHED)
      ) {
        throw Error("Post with such id does not exist or it cannot be blocked");
      }

      const action = getActionIdFromRequest(formData);

      let result;

      switch (action) {
        case ACTION_REJECT:
          result = await considerComplaint(complaintId, sessionUser.id, {
            accept: false,
          });
          break;

        case ACTION_ACCEPT:
          result = await acceptComplaintAction(
            complaintId,
            sessionUser.id,
            postId
          );
          break;
      }

      if (!result) {
        throw Error("Something went wrong");
      }

      return result;
    },
    { failureRedirect: NavigationLink.LOGIN }
  );
}
