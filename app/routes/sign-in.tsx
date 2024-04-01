import { ActionFunctionArgs, redirect } from '@vercel/remix'
import { signIn } from '~/services/users'
import { getSession, commitSession } from '~/session.server'

export const loader = () => {
  return redirect('/')
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = await signIn({
    email: 'meme@gmail.com',
    password: 'Qq123123',
  })

  console.log(response)

  const session = await getSession(request.headers.get('Cookie'))

  session.set('token', 'fakeToken')

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
