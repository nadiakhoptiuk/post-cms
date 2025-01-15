import { useLoaderData } from "react-router";
import type {
  ModalProps,
  TextInputProps as MTextInputProps,
} from "@mantine/core";
import type { FormScope } from "@rvf/react-router";

import type { LANG_EN, LANG_UK } from "../constants/locale";
import type { POST_STATUS } from "../constants/common";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};

export type TLocale = typeof LANG_EN | typeof LANG_UK;

export type TRolesEnum = "admin" | "user";

export type TErrorsMessages = {
  [key: string]: string;
};

export interface TModal extends ModalProps {}

export interface TItemId {
  itemId: number | null;
}

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
  restoredAt?: Date | null;
  restoredBy?: string | null;
  restoredById?: number | null;
};

export type TDBUser = TUser & TDBUserRecord;

export interface TSerializedUser {
  id: number;
  firstName: string;
  lastName: string;
  role: TRolesEnum;
}

export interface TTextInput extends MTextInputProps {
  label: string;
  scope: FormScope<string>;
  placeholder?: string;
}

export type TDBPostRecord = {
  id: number;
  ownerId: number;
  createdAt: Date;
  status: (typeof POST_STATUS)[keyof typeof POST_STATUS];
  author?: string;
  updatedAt?: Date | null;
  updatedBy?: string | null;
  updatedById?: number | null;
  publishedAt?: Date | null;
  rejectedAt?: Date | null;
  rejectReason?: string | null;
  moderatedById?: number | null;
  moderatedBy?: string | null;
  complainedAt?: Date;
  complainedById?: number | null;
  complaintReason: string | null;
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
