import type { TLocale } from "~/shared/types/react";

export type TBurgerMenu = {
  opened: boolean;
  close: () => void;
  locale: TLocale;
  hiddenFrom?: string;
};
