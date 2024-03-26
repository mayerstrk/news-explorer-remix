import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react'
import styles from './tailwind.css?url'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { ReactNode, useEffect } from 'react'
import { NavMobilePopup } from './root-layout-components/nav-mobile-popup'
import Footer from './root-layout-components/footer'
import SignInPopup from './root-layout-components/sign-in-popup'
import SignUpPopup from './root-layout-components/sign-up-popup'
import { commitSession, getSession } from './session.server'
import SignOutPopup from './root-layout-components/sign-out-popup'
import { useClosePopups } from './hooks/zustand/use-popup'
import { useCurrentUserActions } from './hooks/zustand/use-current-user'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('token')) {
    return json({
      signedIn: true,
      userData: { email: 'momo@gmail.com', username: 'momo' },
    })
  }

  return json(
    { signedIn: false, userData: null },
    { headers: { 'Set-Cokkie': await commitSession(session) } },
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { signedIn, userData } = useLoaderData<typeof loader>()
  const { setEmail, setUsername } = useCurrentUserActions()

  useEffect(() => {
    if (userData) {
      setEmail(userData.email)
      setUsername(userData.username)
    }
  }, [signedIn, setEmail, setUsername, userData])

  useClosePopups()()

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
          href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap'
        />
      </head>
      {/* gobal styles here */}
      <body className='relative h-dvh w-full min-w-[240px] font-roboto'>
        <NavBarMain signedIn={signedIn} />
        <NavMobilePopup signedIn={signedIn} />
        <SignUpPopup />
        <SignInPopup />
        <SignOutPopup />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
