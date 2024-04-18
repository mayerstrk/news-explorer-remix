import { env } from 'environment-config'
import { extractTokenFromSetCookieHeader } from '~/utils/helpers'
import { HttpMethod } from '~/utils/string-unions'
import { DBApiErrorSchema } from '../utils/db-api-zod-error-schemas'
import { DBApiEndpoint } from '~/utils/enums'
import { json } from '@remix-run/node'
import { isNodeInternalError } from '../utils/node-zod-error-schemas'
import { DBApiRequestHelperResult } from '../types/helper-types'

export const requestBuilder = <
  R,
  T extends Record<string, unknown> = Record<string, never>,
>(
  endpoint: DBApiEndpoint,
  {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) => {
  return async (body?: T): Promise<DBApiRequestHelperResult<R>> => {
    try {
      const response = await fetch(`${env.DB_API_URL + endpoint}`, {
        method,
        headers,
        body: method != 'GET' && body ? JSON.stringify(body) : undefined,
        credentials: 'include',
      })

      const setCookieHeader = response.headers.get('Set-Cookie')
      let token
      if (setCookieHeader) {
        token = extractTokenFromSetCookieHeader(setCookieHeader)
      }

      const parsedResponse = await response.json()

      if (!response.ok) {
        const validation = DBApiErrorSchema.safeParse(parsedResponse)
        if (!validation.success) {
          console.error('Response not of expected shape', {
            cause: { response, validation: validation.error },
          })
        }
        return {
          success: false,
          response: parsedResponse,
          token: null,
        }
      }

      return { success: true, response: parsedResponse, token }
    } catch (caught) {
      let status
      let message

      switch (true) {
        case isNodeInternalError(caught) && caught.code === 'ECONNREFUSED':
          message =
            'unable to connect to the server. Please check your internet connection or try again later.'
          status = 408
          break
        default:
          status = 500
          message = 'an unexpected error occurred'
      }

      console.error(message, { cause: caught })
      throw json(
        {
          signedIn: true,
          username: 'user',
          message: 'Request failed, ' + message,
        },
        { status },
      )
    }
  }
}
