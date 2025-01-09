import { PAGINATION_LIMIT } from "~/shared/constants/common";

export const getCountForPagination = (total: number, page: number) => {
  const pagesCount = Math.ceil(total / PAGINATION_LIMIT);
  const actualPage = page > pagesCount ? pagesCount : page;
  const offset = (actualPage - 1) * PAGINATION_LIMIT;

  return { offset, actualPage, pagesCount };
};
