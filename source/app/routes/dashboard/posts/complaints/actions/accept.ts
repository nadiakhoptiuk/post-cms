import type { TFunction } from "i18next";
import { considerComplaint } from "~/shared/.server/repository/complaints";
import { blockPostById } from "~/shared/.server/repository/posts";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function acceptComplaintAction(
  complaintId: number,
  sessionUserId: number,
  postId: number,
  t: TFunction
) {
  const updatedComplaint = await considerComplaint(complaintId, sessionUserId, {
    accept: true,
  });

  const blockedPost = await blockPostById(postId, sessionUserId);

  if (!updatedComplaint || !blockedPost) {
    throw new InternalError(
      t("responseErrors.failed"),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
    );
  }

  return updatedComplaint;
}
