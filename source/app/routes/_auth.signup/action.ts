import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "react-router";

import { NavigationLink } from "~/shared/constants/navigation";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  // const session = await getSession(request.headers.get("cookie"));

  // if (typeof locale === "string" && i18n.supportedLngs.includes(locale)) {
  //   session.set("locale", locale);
  // }

  return redirect(NavigationLink.HOME);
}
