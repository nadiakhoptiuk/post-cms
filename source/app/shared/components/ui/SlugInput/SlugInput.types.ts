import type { TLocale, TTextInput } from "~/shared/types/react";

export interface TSlugInput extends TTextInput {
  aria: string;
  title: string;
  locale: TLocale;
}
