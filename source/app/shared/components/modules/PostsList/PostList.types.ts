import type { TDBPostRecord, TPost, TPostCardType } from "~/shared/types/react";

export type TPostList = {
  posts: Array<TPost & TDBPostRecord>;
  userId?: number;
  cardType?: TPostCardType;
};
