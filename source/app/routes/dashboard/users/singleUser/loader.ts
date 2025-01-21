import { data } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getUserById } from "~/shared/.server/repository/users";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { NewSerializeFrom, TDBUser } from "~/shared/types/react";
import type { Route } from "./+types/route";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export const loader = async ({
  request,
  params,
}: Route.LoaderArgs): Promise<{ user: TDBUser }> => {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (_, t) => {
      const user = await getUserById(Number(params.id));

      if (!user) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      return data({ user });
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};

export type TLoaderData = NewSerializeFrom<typeof loader>;
