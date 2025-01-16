import type { TSerializedUser, WithChildren } from "~/shared/types/react";

export type THomeLayout = {
  user: TSerializedUser | null;
} & WithChildren;
