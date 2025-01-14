import { PAGINATION_LIMIT, SESSION_USER_KEY } from "~/shared/constants/common";
import { getSession } from "../services/session";
import type { TSerializedUser } from "~/shared/types/react";

export const getCountForPagination = (total: number, page: number) => {
  const pagesCount = Math.ceil(total / PAGINATION_LIMIT);
  const actualPage = page > pagesCount ? pagesCount : page;
  const offset = (actualPage - 1) * PAGINATION_LIMIT;

  return { offset, actualPage, pagesCount };
};

export const getSessionUserFromRequest = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser: TSerializedUser = session.get(SESSION_USER_KEY);

  return sessionUser;
};
