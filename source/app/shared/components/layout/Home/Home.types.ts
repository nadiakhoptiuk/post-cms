import { TSerializedUser, WithChildren } from "~/shared/types/remix";

export type THomeLayout = {
  user: TSerializedUser;
} & WithChildren;
