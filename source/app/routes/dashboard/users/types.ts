import type { TDBUser, TUser } from "~/shared/types/react";

export type TUsersData = { users: TDBUser[] };

export type TEditUserForm = {
  userData: TUser;
  hasBeenDeleted?: boolean;
};
