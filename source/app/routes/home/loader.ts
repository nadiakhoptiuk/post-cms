import { LoaderFunctionArgs } from "react-router";
import { getAuthUser } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionUser = await getAuthUser(
    request,
    {
      isPublicRoute: true,
      allowedRoles: ["USER"],
      allowedRoutes: { ADMIN: NavigationLink.DASHBOARD },
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  return Response.json({ user: sessionUser });
};
