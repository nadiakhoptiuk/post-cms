import { NavigationLink } from "~/shared/constants/navigation";
import type { TRolesEnum } from "~/shared/types/react";

export type GetCurrentUserOptions = {
  failureRedirect?: (typeof NavigationLink)[keyof typeof NavigationLink];
  successRedirect?: (typeof NavigationLink)[keyof typeof NavigationLink];
};

export type GetRouteOptions = {
  isPublicRoute: boolean;
  allowedRoles: TRolesEnum[];
  isAuthRoute?: boolean;
};

export const enum POST_STATUS {
  PUBLISHED = "published",
  ON_MODERATION = "on moderation",
  REJECTED = "rejected",
  BLOCKED = "blocked",
}
