export const SESSION_USER_KEY = "user";
export const SESSION_LOCALE_KEY = "locale";
export const SESSION_ERROR_KEY = "auth-error";

export const ROLE_USER = "user";
export const ROLE_ADMIN = "admin";
export const ROLE_SELECT_OPTIONS = [ROLE_USER, ROLE_ADMIN] as string[];

export const SEARCH_PARAMETER_NAME = "search";
export const PAGE_PARAMETER_NAME = "page";
export const PAGINATION_LIMIT = 5;
export const PAGINATION_LIMIT_FOR_HOME = 10;

export const enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
}

export const enum POST_STATUS {
  PUBLISHED = "published",
  ON_MODERATION = "on moderation",
  REJECTED = "rejected",
  BLOCKED = "blocked",
}
