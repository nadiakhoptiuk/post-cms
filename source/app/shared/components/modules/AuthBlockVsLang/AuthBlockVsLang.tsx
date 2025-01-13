import { Flex } from "@mantine/core";

import { AuthNav } from "../../ui/AuthNav";
import { LanguageSelector } from "../../ui/LanguageSelector";

import type { TLocale } from "~/shared/types/react";

export const AuthBlockVsLang = ({ locale }: { locale: TLocale }) => {
  return (
    <Flex display="flex" columnGap="md" visibleFrom="xs">
      <AuthNav />
      <LanguageSelector locale={locale} />
    </Flex>
  );
};
