import { NativeSelectProps } from "@mantine/core";

import { TLocale } from "~/shared/types/remix";

export interface TLanguageSelector extends NativeSelectProps {
  locale: TLocale;
}
