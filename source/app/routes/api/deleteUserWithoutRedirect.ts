import { getSession } from "~/shared/.server/services/session";

import type { Route } from "../../+types/root";
import { SESSION_USER_KEY } from "~/shared/constants/common";

import { deleteUserById } from "~/shared/.server/repository/users";
import { errorHandler } from "~/shared/.server/utils/errorHandler";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("id");

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  try {
    await deleteUserById(Number(userId), sessionUser.id);
  } catch (error) {
    errorHandler(error);
  }
}
