import { env } from 'environment-config'
import { z } from 'zod'
import { NewsApiErrorSchema } from '~/utils/errors'
import { HttpMethod } from '~/utils/string-unions'

type RequestHelperResult<R> =
  | { success: true; response: R }
  | {
      success: false
      response: z.infer<typeof NewsApiErrorSchema>
    }

export default function requestBuilder<
  R,
  T extends Record<string, unknown> = Record<string, never>,
>(
  endpointWithParams: string,
  {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': env.NEWS_API_KEY,
    },
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) {
  return async (body?: T): Promise<RequestHelperResult<R>> => {
    try {
      const response = await fetch(`${env.NEWS_API_URL + endpointWithParams}`, {
        method,
        headers,
        body: method != 'GET' && body ? JSON.stringify(body) : undefined,
        credentials: 'include',
      })

      const parsedResponse = await response.json()

      if (!response.ok) {
        const validation = NewsApiErrorSchema.safeParse(parsedResponse)
        if (!validation.success) {
          console.error('Response not of expected shape', {
            cause: { response, validation: validation.error },
          })
        }
        return {
          success: false,
          response: parsedResponse,
        }
      }

      return { success: true, response: parsedResponse }
    } catch (caught) {
      if (caught instanceof z.ZodError) {
        const validationError = new Error(
          'Request failed and response not of expected shape',
          {
            cause: caught,
          },
        )
        console.error(validationError.message, validationError.cause)
      }

      throw caught instanceof Error
        ? caught
        : new Error('Request failed', { cause: caught })
    }
  }
}
