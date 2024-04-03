import { ActionFunctionArgs, redirect } from '@vercel/remix'
import { destroySession, getSession } from '~/session.server'

export const loader = () => {
  return redirect('/home')
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  return redirect('/saved-articles', {
    headers: {
      'Cache-Control': 'no-store',
      'Set-Cookie': await destroySession(session),
    },
  })
}

export type SignoutAction = typeof action
