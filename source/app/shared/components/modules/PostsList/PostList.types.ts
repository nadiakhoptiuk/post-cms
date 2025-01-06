import type { TDBPostRecord, TPost } from "~/shared/types/react";

export type TPostList = {
  posts: Array<TPost & TDBPostRecord>;
};
