import { ActionFunctionArgs, json, redirect } from '@vercel/remix'
import invariant from 'tiny-invariant'
import { saveArticle } from '~/services/articles.server'
import { destroySession, getSession } from '~/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')

  if (!token) {
    return redirect('/home', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  const article = await request.json()
  invariant(article, 'Missing article')

  const { success } = await saveArticle(token, article)

  if (!success) {
    console.error('failed to save article')
    return json({ success: false, message: 'failed' }, { status: 500 })
  }

  console.log('save article success', article)

  return json({ success: true, messgae: 'success' }, { status: 200 })
}
