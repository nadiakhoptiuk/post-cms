import { updateTagById } from "~/shared/.server/repository/tags";
import { getTagDataFromRequest } from "~/shared/.server/utils/tagUtils";

export async function updateTagAction(
  formData: FormData,
  sessionUserId: number,
  tagId: number
) {
  const tagData = getTagDataFromRequest(formData);

  return await updateTagById(tagId, tagData, sessionUserId);
}
