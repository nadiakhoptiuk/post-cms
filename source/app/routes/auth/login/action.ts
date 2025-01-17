import { loginUser, publicGate } from "~/shared/.server/services/auth";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await publicGate(
    request,
    {
      isPublicRoute: true,
      isAuthRoute: true,
      allowedRoles: [],
    },
    async () => {
      return await loginUser(request);
    }
  );
}
