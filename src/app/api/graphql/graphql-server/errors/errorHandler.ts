import { GraphQLError } from 'graphql'
import { AppError } from './AppError'

function logError(error: unknown): void {
  const timestamp = new Date().toISOString()

  if (error instanceof AppError) {
    console.warn(`[${timestamp}] [${error.code}] ${error.message}\n${error.stack}`)
  } else {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error(`[${timestamp}] [INTERNAL_ERROR] ${err.message}\n${err.stack}`)
  }
}

export function maskError(error: unknown, _message: string): GraphQLError {
  if (!(error instanceof GraphQLError)) {
    logError(error)
    return new GraphQLError('An unexpected error occurred', {
      extensions: { code: 'INTERNAL_ERROR' },
    })
  }

  const original = error.originalError

  if (!original) {
    return error
  }

  logError(original)

  if (original instanceof AppError) {
    return new GraphQLError(original.message, {
      extensions: { code: original.code },
    })
  }

  return new GraphQLError('An unexpected error occurred', {
    extensions: { code: 'INTERNAL_ERROR' },
  })
}
