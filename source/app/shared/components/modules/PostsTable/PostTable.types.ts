import type { TDBPostRecord, TPost } from "~/shared/types/react";

export type TPostTable = {
  posts: Array<TPost & TDBPostRecord>;
};
