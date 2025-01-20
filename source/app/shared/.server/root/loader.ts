import i18next from "~/shared/.server/services/i18n";

import { commitSession, sessionStorage } from "../services/session";

import { DEFAULT_LANG, LANGUAGES } from "~/shared/constants/locale";
import type { NewSerializeFrom, TLocale } from "~/shared/types/react";
import type { Route } from ".react-router/types/app/+types/root";
import { data } from "react-router";
import { SESSION_ERROR_KEY } from "~/shared/constants/common";

export async function loader({ request }: Route.LoaderArgs) {
  const locale = await i18next.getLocale(request);
  // const t = await i18next.getFixedT(request, "root");

  const meta = {
    title: "app.title",
  };

  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const error = session.get(SESSION_ERROR_KEY);

  session.unset(SESSION_ERROR_KEY);

  return data(
    {
      error: error,
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
  error?: string;
};
export type TRootLoaderData = NewSerializeFrom<TRootLoader>;
