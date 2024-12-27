import "@mantine/core/styles.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next/react";

import { ReactNode } from "react";
import { LinksFunction } from "@remix-run/node";
import {
  // createTheme,
  MantineProvider,
  // DEFAULT_THEME,
  // mergeMantineTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

import { TRootLoader } from "~/shared/.server/root/loader";

export { loader } from "~/shared/.server/root/loader";
export { action } from "~/shared/.server/root/action";
export { meta } from "~/shared/utils/meta";

import appStylesHref from "./app.css?url";

// const themeOverride = createTheme({
//   /** Your theme override here */
//   colors: {},
// });

// export const providerTheme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export function Layout({ children }: { children: ReactNode }) {
  const { theme, locale } = useLoaderData<TRootLoader>();
  useChangeLanguage(locale);

  return (
    <html lang={locale} data-mantine-color-scheme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <MantineProvider>
          {children}
          <Notifications />
        </MantineProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
