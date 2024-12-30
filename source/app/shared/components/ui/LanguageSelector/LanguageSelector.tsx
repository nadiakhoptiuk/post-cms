import { useFetcher } from "react-router";
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
            action: "/api/changeLanguage",
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
