import { getAllUsers } from "~/shared/.server/repository/users";

import type { Route } from "./+types/route";
import {
  PAGE_PARAMETER_NAME,
  SEARCH_PARAMETER_NAME,
} from "~/shared/constants/common";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_PARAMETER_NAME) || "";
  const page = Number(url.searchParams.get(PAGE_PARAMETER_NAME) || "1");

  const { allUsers, actualPage, pagesCount } = await getAllUsers(query, page);

  return { users: allUsers, query: query, actualPage, pagesCount };
};
