import { data } from "react-router";

import { publicGate } from "~/shared/.server/services/auth";
import { commitSession, getSession } from "~/shared/.server/services/session";

import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";
import type { NewSerializeFrom } from "~/shared/types/react";

export const loader = async ({ request }: Route.LoaderArgs) => {
  return await publicGate(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [],
      isAuthRoute: true,
    },
    async () => {
      const session = await getSession(request.headers.get("cookie"));
      return data({
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};

export type TLoaderData = NewSerializeFrom<typeof loader>;
