import { useLoaderData } from "react-router";
import type { TextInputProps as MTextInputProps } from "@mantine/core";
import type { FormScope } from "@rvf/react-router";

import type { LANG_EN, LANG_UK } from "../constants/locale";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};

export type TLocale = typeof LANG_EN | typeof LANG_UK;

export type TRolesEnum = "admin" | "user";

export type TErrorsMessages = {
  [key: string]: string;
};

export type TFormType = { formType: "create" | "update" };

export type TSignupData = {
  firstName: string;
  lastName: string;
  email: string;
  role?: TRolesEnum;
};

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  role: TRolesEnum;
};

export type TUpdatedById = {
  updatedById: number;
};

export type TUserPassword = {
  password: string;
};

export type TDBUserRecord = {
  id: number;
  createdAt: Date;
  updatedAt?: Date | null;
  updatedBy?: string | null;
  updatedById?: number | null;
  deletedAt?: Date | null;
  deletedBy?: string | null;
  deletedById?: number | null;
};

export type TDBUser = TUser & TDBUserRecord;

export interface TSerializedUser {
  id: number;
  firstName: string;
  lastName: string;
  role: TRolesEnum;
}

export type THomeLoader = {
  user: TSerializedUser;
};

export interface TTextInput extends MTextInputProps {
  label: string;
  scope: FormScope<string>;
  placeholder?: string;
}

export type TDBPostRecord = {
  id: number;
  ownerId: number;
  createdAt: Date;
  updatedAt?: Date | null;
  updatedBy?: string | null;
  updatedById?: number | null;
  deletedAt?: Date | null;
  deletedBy?: string | null;
  deletedById?: number | null;
  publishedAt?: Date | null;
  moderatedById?: number | null;
  moderatedBy?: string | null;
  complainedAt?: Date;
  complainedById?: number | null;
  complainedBy?: string | null;
  blockedAt?: Date | null;
  blockedById?: number | null;
  blockedBy?: string | null;
};

export type TPost = {
  title: string;
  slug: string;
  content: string;
};

export type TPostCardType = "own" | "all";
