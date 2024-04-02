import { Links, Meta, Scripts, useRouteError } from '@remix-run/react'
import { ActionFunctionArgs, redirect } from '@vercel/remix'
import { PopupLayout } from '~/atoms/popup-atoms'
import { signIn } from '~/services/auth'
import { getSession, commitSession } from '~/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { response } = await signIn({
      email: 'meme@gmail.com',
      password: 'Qq2123123',
    })
    console.log(response)
  } catch (error) {
    console.error(error)
    throw error
  }

  const session = await getSession(request.headers.get('Cookie'))

  session.set('token', 'fakeToken')

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  return (
    <html lang='en'>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  )
}
