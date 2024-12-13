import '@mantine/core/styles.css'

import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from '@remix-run/react'
import { ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'

import { TRootLoader } from '~/shared/.server/root/loader'

export { loader } from '~/shared/.server/root/loader'
export { meta } from '~/shared/utils/meta'

export function Layout ({ children }: { children: ReactNode }) {
  const { theme, locale } = useLoaderData<TRootLoader>()

  return (
    <html lang={locale} data-mantine-color-scheme={theme}>
    <head>
      <meta charSet="utf-8"/>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <Meta/>
      <Links/>
    </head>
    <body>
    <MantineProvider>{children}</MantineProvider>
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  )
}

export default function App () {
  return <Outlet/>
}
