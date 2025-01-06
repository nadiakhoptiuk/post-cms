import slug from "slug";

import type { TLocale } from "../types/react";

export const generateSlug = (title: string, locale: TLocale) => {
  return slug(title, { locale: locale });
};
