import { Outlet } from "@remix-run/react";
import { Home } from "~/shared/components/layout/Home";

import { ActionFunctionArgs } from "@remix-run/node";

import i18n from "~/shared/services/i18n";
import {
  commitSession,
  getSession,
} from "~/shared/.server/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const locale = formData.get("locale");

  console.log("EXECUTE HOME ACTION, locale", locale);

  const session = await getSession(request.headers.get("cookie"));

  if (typeof locale === "string" && i18n.supportedLngs.includes(locale)) {
    session.set("locale", locale);
  }

  return Response.json(
    { locale },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export const handle = {
  i18n: "common",
};

export default function HomeLayout() {
  return (
    <Home>
      <Outlet />
    </Home>
  );
}
