import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { NavigationLink } from "./app/shared/constants/navigation";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          // Home
          route(NavigationLink.HOME, "routes/_index/route.tsx", {
            index: true,
          });
          // Dashboard
          route(NavigationLink.DASHBOARD, "routes/dashboard/route.tsx", {
            index: true,
          });
          // Dashboard My Posts (admin's posts)
          // route(
          //   NavigationLink.DASHBOARD_MY_POSTS,
          //   "routes/dashboard.my-posts/route.tsx"
          // );

          // Dashboard Users
          // route(
          //   NavigationLink.DASHBOARD_USERS,
          //   "routes/dashboard.users/route.tsx"
          // );

          // Dashboard Tags
          // route(
          //   NavigationLink.DASHBOARD_TAGS,
          //   "routes/dashboard.tags/route.tsx"
          // );

          // Dashboard Complaints
          // route(
          //   NavigationLink.DASHBOARD_COMPLAINTS,
          //   "routes/dashboard.complaints/route.tsx"
          // );
        });
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});
