import { z } from 'zod'
import {
  DBApiErrorSchema,
  NewsApiErrorSchema,
} from '../utils/db-api-zod-error-schemas'

type DBApiRequestHelperResult<R> =
  | { success: true; response: R; token: string | null | undefined }
  | {
      success: false
      response: z.infer<typeof DBApiErrorSchema>
      token: null
    }

type NewsApiRequestHelperResult<R> =
  | { success: true; response: R }
  | {
      success: false
      response: z.infer<typeof NewsApiErrorSchema>
    }

export type { DBApiRequestHelperResult, NewsApiRequestHelperResult }
