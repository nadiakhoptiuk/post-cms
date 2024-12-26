import { useLoaderData } from "@remix-run/react";
import { TextInputProps as MTextInputProps } from "@mantine/core";
import { FormScope } from "@rvf/remix";

import { LANG_EN, LANG_UK } from "../constants/locale";
import { User } from "@prisma/client";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};

export type TLocale = typeof LANG_EN | typeof LANG_UK;

export interface TTextInput extends MTextInputProps {
  label: string;
  scope: FormScope<string>;
  placeholder?: string;
}

export interface TUser {
  firstName: string;
  lastName: string;
  email: string;
  role: User["role"];
  password: string;
}

export interface TDBUser extends TUser {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface TSerializedUser {
  id: number;
  firstName: string;
  lastName: string;
  role: User["role"];
}
