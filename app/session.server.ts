import { createCookieSessionStorage } from '@remix-run/node'

type SessionData = {
  token: string
}

type SessionFlashData = {
  error: string
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'session',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  })
