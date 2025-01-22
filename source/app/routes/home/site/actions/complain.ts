import type { TFunction } from "i18next";
import { complainAboutPost } from "~/shared/.server/repository/complaints";
import {
  getOnlyAnotherUserPostById,
  getPostById,
} from "~/shared/.server/repository/posts";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export const complainAction = async (
  formData: FormData,
  sessionUserId: number,
  t: TFunction
) => {
  const postId = formData.get("postId");
  const complaintReason = formData.get("complaintReason");

  if (typeof postId !== "string" || typeof complaintReason !== "string") {
    throw new InternalError(
      t("responseErrors.invalidField"),
      HTTP_STATUS_CODES.BAD_REQUEST_400
    );
  }

  const existingPost = await getPostById(Number(postId));
  if (!existingPost) {
    throw new InternalError(
      t("responseErrors.notFound"),
      HTTP_STATUS_CODES.NOT_FOUND_404
    );
  }

  const existingAnotherUserPost = await getOnlyAnotherUserPostById(
    sessionUserId,
    Number(postId)
  );
  if (!existingAnotherUserPost) {
    throw new InternalError(
      t("responseErrors.forbidden"),
      HTTP_STATUS_CODES.FORBIDDEN_403
    );
  }

  return await complainAboutPost(
    Number(postId),
    complaintReason,
    sessionUserId
  );
};
