import type { LinksFunction, LoaderFunctionArgs } from '@vercel/remix'
import { SpeedInsights } from '@vercel/speed-insights/remix'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react'
import styles from './main.css?url'

import { NavMobilePopup } from './root-layout-components/nav-mobile-popup'
import Footer from './root-layout-components/footer'
import SignInPopup from './root-layout-components/sign-in-popup'
import SignUpPopup from './root-layout-components/sign-up-popup'
import { destroySession, getSession } from './session.server'
import SignOutPopup from './root-layout-components/sign-out-popup'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('token')) {
    return json({
      signedIn: true,
      userData: { username: session.get('username') },
    })
  }

  return json(
    { signedIn: false, userData: null },
    { headers: { 'Set-Cookie': await destroySession(session) } },
  )
}

export default function App() {
  const { signedIn, userData } = useLoaderData<typeof loader>()
  const username = userData?.username

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Inter:wght@100..900&display=swap'
        />
      </head>

      {/* gobal styles here */}
      <body className='relative flex min-h-[568px] min-w-[320px] flex-col overflow-x-hidden font-roboto'>
        <NavMobilePopup username={username || ''} signedIn={signedIn} />
        <SignUpPopup />
        <SignInPopup />
        <SignOutPopup />
        <div id='root-outlet' className='flex-grow'>
          <Outlet />
        </div>
        <Footer signedIn={signedIn} />
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
      </body>
    </html>
  )
}

export type RootLoader = typeof loader
