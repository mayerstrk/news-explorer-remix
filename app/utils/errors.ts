import { z } from 'zod'

const ApiErrorSchema = z.object({
  message: z.string(),
  status: z.number(),
  name: z.string(),
  cause: z.union([z.object({}).optional().nullable(), z.undefined()]),
})

export { ApiErrorSchema }
