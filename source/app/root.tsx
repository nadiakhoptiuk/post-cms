import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { Container, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// export { meta } from "~/shared/utils/meta";

export { loader } from "~/shared/.server/root/loader";

import type { TRootLoader } from "~/shared/.server/root/loader";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { useChangeLanguage } from "./shared/services/i18n.react";
import { GlobalNotification } from "./shared/components/ui/GlobalNotification";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, locale, error, success } = useLoaderData<TRootLoader>();
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
          <ModalsProvider>
            {children}
            <Notifications />
            <GlobalNotification error={error} success={success} />
          </ModalsProvider>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <Container>
        <h1>{message}</h1>
        <p>{details}</p>

        {stack && (
          <pre>
            <code>{stack}</code>
          </pre>
        )}
      </Container>
    </main>
  );
}
