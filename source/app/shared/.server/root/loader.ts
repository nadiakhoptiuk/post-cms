import { LoaderFunctionArgs } from "@remix-run/node";
import { NewSerializeFrom } from "~/shared/types/remix";
import i18next from "~/shared/.server/services/i18n";
import { DEFAULT_LANG, LANGUAGES } from "~/shared/constants/locale";

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  const t = await i18next.getFixedT(request, "root");

  const meta = {
    title: t("app.title"),
  };

  return {
    theme: "light" satisfies "light" | "dark",
    locale: LANGUAGES.includes(locale) ? locale : DEFAULT_LANG,
    meta,
  };
}

export type TRootLoader = typeof loader;
export type TRootLoaderData = NewSerializeFrom<TRootLoader>;
