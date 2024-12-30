import { type RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) => {
  return defineRoutes((route) => {
    route("/", "routes/home/route.tsx", { index: true });
    route("", "routes/_auth/route.tsx", () => {
      route("/login", "routes/_auth.login/route.tsx");
      route("/signup", "routes/_auth.signup/route.tsx");
    });
    route("/dashboard", "routes/dashboard/route.tsx", () => {
      route("dashboard/posts/all", "routes/dashboard.posts.all/route.tsx");
      route("dashboard/users", "routes/dashboard.users/route.tsx");
      route(
        "dashboard/users/:userId",
        "routes/dashboard.users_.$userId/route.tsx"
      );
    });
  });
}) satisfies RouteConfig;
