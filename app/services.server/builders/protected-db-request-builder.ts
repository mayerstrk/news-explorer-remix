import { HttpMethod } from '~/utils/string-unions'
import { requestBuilder } from './db-api-request-builder'
import { DBApiEndpoint } from '~/utils/enums'
import { Session } from '@remix-run/node'
import invariant from 'tiny-invariant'

export const protectedDBRequestBuilder = <
  R,
  T extends Record<string, unknown> = Record<string, never>,
>(
  session: Session,
  endpoint: string,
  {
    method = 'GET',
    headers = {},
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) => {
  invariant(session, 'Session is missing')
  const token = session.get('token')
  invariant(token, 'No token found in session')

  return requestBuilder<R, T>(endpoint as DBApiEndpoint, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  })
}
