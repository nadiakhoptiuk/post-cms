import { getSession } from "../services/session";

import {
  ACTION_ID_KEY_NAME,
  PAGE_PARAMETER_NAME,
  PAGINATION_LIMIT,
  SEARCH_PARAMETER_NAME,
  SESSION_USER_KEY,
} from "~/shared/constants/common";
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

export const getPaginationDataFromRequest = (request: Request) => {
  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_PARAMETER_NAME) || "";
  const page = Number(url.searchParams.get(PAGE_PARAMETER_NAME) || "1");

  return { query, page };
};

export const getActionIdFromRequest = (formData: FormData) => {
  const actionId = formData.get(ACTION_ID_KEY_NAME);

  if (typeof actionId !== "string") {
    throw new Error("Action id is not a string");
  }

  return actionId;
};
