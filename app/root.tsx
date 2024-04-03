import type { LinksFunction, LoaderFunctionArgs } from '@vercel/remix'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import styles from './tailwind.css?url'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { useEffect } from 'react'
import { NavMobilePopup } from './root-layout-components/nav-mobile-popup'
import Footer from './root-layout-components/footer'
import SignInPopup from './root-layout-components/sign-in-popup'
import SignUpPopup from './root-layout-components/sign-up-popup'
import { commitSession, getSession } from './session.server'
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
    { headers: { 'Set-Cookie': await commitSession(session) } },
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
      <body className='relative flex min-h-screen flex-col font-roboto'>
        <NavMobilePopup username={username || ''} signedIn={signedIn} />
        <SignUpPopup />
        <SignInPopup />
        <SignOutPopup />
        <div className='flex-grow'>
          <Outlet />
        </div>
        <Footer signedIn={signedIn} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export type RootLoader = typeof loader
