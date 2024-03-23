class ApiError extends Error {
  status: number
  name: string
  cause?: Error

  constructor(message: string, status: number, name: string, cause?: Error) {
    super(message)
    this.status = status
    this.name = name
    Error.captureStackTrace(this, this.constructor)
    if (cause) {
      this.cause = cause
    }
  }
}

function isApiError(error: unknown): error is ApiError {
  if (typeof error === 'object' && error !== null) {
    const e = error as ApiError

    return (
      typeof e.message === 'string' &&
      typeof e.status === 'number' &&
      typeof e.name === 'string' &&
      (e.cause === undefined || e.cause instanceof Error)
    )
  }

  return false
}

export type { ApiError }
export { isApiError }
