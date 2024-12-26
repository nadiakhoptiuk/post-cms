import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { authenticator } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";

export async function action({ request }: ActionFunctionArgs) {
  // const formData = await request.formData();
  // const email = formData.get("email");
  // const password = formData.get("password");
  // const firstName = formData.get("firstName");
  // const lastName = formData.get("lastName");

  // console.log(email, password);

  const sessionUser = await authenticator.authenticate("user-signup", request);

  console.log(sessionUser);

  // const session = await getSession(request.headers.get("cookie"));
  // session.set("user", user);

  // if (typeof locale === "string" && i18n.supportedLngs.includes(locale)) {
  //   session.set("locale", locale);
  // }

  return redirect(NavigationLink.HOME);
}
