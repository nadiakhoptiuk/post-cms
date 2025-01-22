import { useLoaderData } from "react-router";
import type {
  ModalProps,
  TextInputProps as MTextInputProps,
} from "@mantine/core";
import type { FormScope } from "@rvf/react-router";

import type { LANG_EN, LANG_UK } from "../constants/locale";
import type { COMPLAINT_STATUS } from "../constants/common";

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

export type TDBComplaintRecord = {
  id: string;
  createdAt: Date;
  createdById: number;
  reason: string;
  complainedAboutPostId: number;
  consideredById?: number | null;
  status?: (typeof COMPLAINT_STATUS)[keyof typeof COMPLAINT_STATUS];

  postSlug: string;
  postTitle: string;
  postId: number;
  author: string;
};

export type TTagForm = {
  name: string;
};

export type TDBTagRecord = {
  id: string;
  createdAt: Date;
  createdById: number;
  updatedAt: Date | null;
  updatedById: number | null;

  updatedBy: string | null;
  author: string | null;
};

export type TTag = TTagForm & TDBTagRecord;

export type TPostToTag = {
  tagName: string;
  tagId: number;
  postId: number;
};

export type TDBPostRecord = {
  id: number;
  ownerId: number;
  createdAt: Date;
  postStatus: string;
  updatedAt?: Date | null;
  updatedBy?: string | null;
  updatedById?: number | null;
  moderatedAt?: Date | null;
  publishedAt?: Date | null;
  rejectedAt?: Date | null;
  rejectReason?: string | null;
  moderatedById?: number | null;
  moderatedBy?: string | null;
  blockedAt?: Date | null;
  blockedById?: number | null;
  blockedBy?: string | null;
};

export type TModeratedAt = {
  moderatedAt: Date;
};

export type TAuthor = {
  author: string;
};

export type TPostAdditionalFields = {
  tags: TPostToTag[];
} & TAuthor;

export type TPost = {
  title: string;
  slug: string;
  content: string;
};

export type TTagsArray = {
  tags: string[];
};

export type TPostTags = {
  tags: Array<string>;
};

export type TPostsTable = {
  posts: Array<TPost & TDBPostRecord & TAuthor>;
};

export type TAuthorQuery = {
  firstName: string;
  lastName: string;
  fullName: string | unknown;
};

export type TPostsToTagQuery = {
  tag: { name: string; id: number };
  postId: number;
  tagId: number;
};

export type TPostQuery = TPost &
  TDBPostRecord & {
    author: TAuthorQuery;
    postsToTags: TPostsToTagQuery[];
  };
