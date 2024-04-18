import { z } from 'zod'

const NodeInternalErrorSchema = z.object({
  type: z.string(),
  errno: z.string(),
  code: z.string(),
  erroredSysCall: z.string(),
})

function isNodeInternalError(data: unknown): data is NodeInternalError {
  const result = NodeInternalErrorSchema.safeParse(data)
  return result.success
}

type NodeInternalError = z.infer<typeof NodeInternalErrorSchema>
export type { NodeInternalError }
export { isNodeInternalError }
