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

export interface WithPaginationData {
  actualPage: number;
  pagesCount: number;
}

export interface WithSearchData {
  query: string;
}
