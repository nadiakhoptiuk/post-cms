import { useFetcher } from "@remix-run/react";
import { NativeSelect } from "@mantine/core";

import { DEFAULT_LANG, LANGUAGES } from "~/shared/constants/locale";
import { TLanguageSelector } from "./LanguageSelector.types";

export const LanguageSelector = ({ locale, ...rest }: TLanguageSelector) => {
  const fetcher = useFetcher();

  return (
    <NativeSelect
      onChange={(e) =>
        fetcher.submit(
          { locale: e.target.value.toLowerCase() },
          {
            method: "POST",
            action: "/?index",
          }
        )
      }
      data={LANGUAGES.map((lng) => lng.toUpperCase())}
      defaultValue={locale.toUpperCase() || DEFAULT_LANG}
      size="sm"
      {...rest}
    />
  );
};
