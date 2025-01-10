import type { Dispatch, SetStateAction } from "react";
import type { TDBPostRecord, TPost } from "~/shared/types/react";

export type TPostCard = {
  item: TPost & TDBPostRecord;
  userId: number | undefined;
  location: "own" | "all";
  setPostId: Dispatch<SetStateAction<number | null>>;
};
