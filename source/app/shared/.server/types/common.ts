import { Role } from "@prisma/client";
import { NavigationLink } from "~/shared/constants/navigation";

export type GetCurrentUserOptions = {
  failureRedirect?: (typeof NavigationLink)[keyof typeof NavigationLink];
  successRedirect?: (typeof NavigationLink)[keyof typeof NavigationLink];
};

export type GetRouteOptions = {
  isPublicRoute: boolean;
  allowedRoles: Role[];
  allowedRoutes: Partial<Record<"ADMIN" | "USER", NavigationLink>>;
};
