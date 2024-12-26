import { ActionFunctionArgs } from "@remix-run/node";

import i18n from "~/shared/services/i18n";
import { commitSession, getSession } from "../services/session";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const locale = formData.get("locale");

  console.log("EXECUTE ROOT ACTION");

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
