import { LoaderFunctionArgs } from "@remix-run/node";

import i18next from "~/shared/.server/services/i18n";

import { NewSerializeFrom, TLocale } from "~/shared/types/remix";
import { DEFAULT_LANG, LANGUAGES } from "~/shared/constants/locale";
import { commitSession, sessionStorage } from "../services/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  const t = await i18next.getFixedT(request, "root");

  const meta = {
    title: t("app.title"),
  };

  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  return Response.json(
    {
      theme: "light" satisfies "light" | "dark",
      locale: LANGUAGES.includes(locale) ? locale : DEFAULT_LANG,
      meta,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export type TRootLoader = {
  theme: string;
  locale: TLocale;
  meta: {
    title: string;
  };
};
export type TRootLoaderData = NewSerializeFrom<TRootLoader>;
