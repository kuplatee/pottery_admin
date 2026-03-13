import { GraphQLError } from 'graphql'
import { AppError } from './AppError'
import { logger } from './logger'

function logError(error: unknown): void {
  if (error instanceof AppError) {
    logger.logAppError(error)
  } else {
    const err = error instanceof Error ? error : new Error(String(error))
    logger.logInternalError(err)
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
