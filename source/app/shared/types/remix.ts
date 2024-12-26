import { useLoaderData } from "@remix-run/react";
import { TextInputProps as MTextInputProps } from "@mantine/core";
import { FormScope } from "@rvf/remix";

import { LANG_EN, LANG_UK } from "../constants/locale";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};

export type TLocale = typeof LANG_EN | typeof LANG_UK;

export interface TextInputProps extends MTextInputProps {
  label: string;
  scope: FormScope<string>;
  placeholder?: string;
}
