import { ActionFunctionArgs, redirect } from '@vercel/remix'
import { getSession, commitSession } from '~/session.server'

export const loader = () => {
  return redirect('/')
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  session.set('token', 'fakeToken')

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
