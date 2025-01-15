import { Flex } from "@mantine/core";
import { LanguageSelector } from "~/shared/components/ui/LanguageSelector";
import { AuthNav } from "./AuthNav";

import type { TLocale } from "~/shared/types/react";

export const AuthBlockVsLang = ({ locale }: { locale: TLocale }) => {
  return (
    <Flex display="flex" columnGap="md" visibleFrom="xs">
      <AuthNav />
      <LanguageSelector locale={locale} />
    </Flex>
  );
};
