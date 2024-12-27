import { LoaderFunctionArgs } from "@remix-run/node";
import { getAuthUser } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await getAuthUser(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [],
      allowedRoutes: {
        ADMIN: NavigationLink.DASHBOARD,
        USER: NavigationLink.HOME,
      },
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  return Response.json({ user: null });
};
