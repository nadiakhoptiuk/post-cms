import { LoaderFunctionArgs } from "@remix-run/node";
import { getAuthUser } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionUser = await getAuthUser(
    request,
    {
      isPublicRoute: false,
      allowedRoles: ["ADMIN"],
      allowedRoutes: { USER: NavigationLink.HOME },
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  return Response.json({ user: sessionUser });
};
