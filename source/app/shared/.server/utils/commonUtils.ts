import type { Params } from "react-router";
import { getSession } from "../services/session";

import {
  ACTION_ID_KEY_NAME,
  PAGE_PARAMETER_NAME,
  PAGINATION_LIMIT,
  SEARCH_PARAMETER_NAME,
  SESSION_USER_KEY,
} from "~/shared/constants/common";
import type { TSerializedUser } from "~/shared/types/react";
import { HTTP_STATUS_CODES, InternalError } from "./InternalError";
import type { TFunction } from "i18next";

export const getIdFromRequest = (formData: FormData, t: TFunction) => {
  const id = formData.get("id");

  if (typeof id !== "string") {
    throw new InternalError(
      t("responseErrors.notFound"),
      HTTP_STATUS_CODES.NOT_FOUND_404
    );
  }

  return Number(id);
};

export const getIdFromParams = (params: Params, t: TFunction) => {
  const id = params?.id;

  if (!id) {
    throw new InternalError(
      t("responseErrors.notFound"),
      HTTP_STATUS_CODES.NOT_FOUND_404
    );
  }

  return Number(id);
};

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
    throw new InternalError(
      "Action Id is missing",
      HTTP_STATUS_CODES.BAD_REQUEST_400
    );
  }

  return actionId;
};
