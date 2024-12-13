import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { NavigationLink } from './app/shared/constants/navigation'

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
      routes (defineRoutes) {
        return defineRoutes((route) => {
          // Home
          route(NavigationLink.HOME, 'routes/home/route.tsx', { index: true })

        })
      },
    }),
    tsconfigPaths(),
  ],
});
