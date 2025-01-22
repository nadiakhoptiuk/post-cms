import type { Dispatch, SetStateAction } from "react";
import type {
  TDBPostRecord,
  TPost,
  TPostAdditionalFields,
} from "~/shared/types/react";

export type TPostCard = {
  item: TPost & TDBPostRecord & TPostAdditionalFields;
  userId: number | undefined;
  location: "own" | "all";
  setPostId: Dispatch<SetStateAction<number | null>>;
};
