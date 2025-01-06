import type { TUser } from "~/shared/types/react";

export type TEditUserForm = {
  userData: TUser;
  hasBeenDeleted?: boolean;
};
