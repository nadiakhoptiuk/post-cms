import { useLoaderData } from "@remix-run/react";
import { LANG_EN, LANG_UK } from "../constants/locale";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};

export type TLocale = typeof LANG_EN | typeof LANG_UK;
