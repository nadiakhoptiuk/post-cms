import { Outlet, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";

import { Home } from "~/shared/components/layout/Home";

import i18n from "~/shared/services/i18n";
import { commitSession, getSession } from "~/shared/.server/services/session";
import { THomeLoader } from "~/shared/types/remix";

export { loader } from "./loader";

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
  const data = useLoaderData<THomeLoader>();

  return (
    <Home user={data?.user}>
      <Outlet />
    </Home>
  );
}
