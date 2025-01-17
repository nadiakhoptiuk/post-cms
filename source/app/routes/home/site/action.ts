import { authGate } from "~/shared/.server/services/auth";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";
import { complainAction } from "./actions/complain";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();

      const complainedPost = await complainAction(formData, sessionUser.id);

      if (!complainedPost) {
        throw Error("Something went wrong");
      }

      return complainedPost;
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
