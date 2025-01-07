import type { TDBPostRecord, TPost } from "~/shared/types/react";

export type TPostCard = {
  item: TPost & TDBPostRecord;
  isUserOwner: boolean;
};
