import type { TDBPostRecord, TPost, TPostCardType } from "~/shared/types/react";

export type TPostCard = {
  item: TPost & TDBPostRecord;
  isUserOwner: boolean;
  cardType?: TPostCardType;
};
