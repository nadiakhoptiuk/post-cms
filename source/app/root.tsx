import "@mantine/core/styles.css";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  LinksFunction,
} from "react-router";
import { useChangeLanguage } from "remix-i18next/react";

import { ReactNode } from "react";
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // error.status = 500
    // error.data = "Oh no! Something went wrong!";

    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
