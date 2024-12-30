import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@remix-run/route-config";

export default [
  index("routes/home/route.tsx"),
  layout("_auth/route.tsx", [
    route("_auth/login", "routes/_auth/login/route.tsx"),
    route("_auth/signup", "routes/_auth/signup/route.tsx"),
  ]),
  layout("dashboard/route.tsx", [
    route("dashboard/posts/all", "routes/dashboard.posts.all/route.tsx"),
    route("dashboard/users", "routes/dashboard.users/route.tsx"),
    route(
      "dashboard/users/:userId",
      "routes/dashboard.users_.$userId/route.tsx"
    ),
  ]),
] satisfies RouteConfig;
