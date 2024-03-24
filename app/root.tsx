import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useRouteLoaderData,
} from '@remix-run/react'
import styles from './tailwind.css?url'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { ReactNode } from 'react'
import { NavMobilePopup } from './root-layout-components/nav-mobile-popup'
import Footer from './root-layout-components/footer'
import SignInPopup from './root-layout-components/sign-in-popup'
import SignUpPopup from './root-layout-components/sign-up-popup'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader = async () => {
  // const { success, response: user } = await getCurrentUser()
  // if (!success) {
  //   return json({ signedIn: false })
  // }
  //
  // return json({ signedIn: true, user })
  return json({ signedIn: false })
}

export function Layout({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>('root')
  if (!data) {
    throw new Error('Unexpected errror')
  }
  const signedIn = data === undefined ? false : data.signedIn
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
        <SignInPopup />
        <SignUpPopup />
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
