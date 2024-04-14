import { ActionFunctionArgs, json, redirect } from '@vercel/remix'
import invariant from 'tiny-invariant'
import { deleteArticle } from '~/services.server/db-api/articles'
import { destroySession, getSession } from '~/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')
  if (!token) {
    return redirect('/home', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  const { article_id } = await request.json()
  invariant(article_id, 'Missing article_id')

  const { success } = await deleteArticle(token, article_id)

  if (!success) {
    console.error('failed to unsave article')
    return json({ success: false, message: 'failed' }, { status: 500 })
  }

  return json({ success: true, message: 'success' }, { status: 200 })
}
