import type { TFunction } from "i18next";
import { moderatePostById } from "~/shared/.server/repository/posts";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function rejectPublishPostAction(
  formData: FormData,
  postId: number,
  sessionUserId: number,
  t: TFunction
) {
  const reason = formData.get("reason");

  if (typeof reason !== "string") {
    throw new InternalError(
      t("responseErrors.invalidField"),
      HTTP_STATUS_CODES.BAD_REQUEST_400
    );
  }

  return await moderatePostById(
    postId,
    {
      rejectReason: reason,
      moderatedById: sessionUserId,
    },
    { confirmed: false }
  );
}
