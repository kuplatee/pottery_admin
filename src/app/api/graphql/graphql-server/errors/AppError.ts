export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  REFERENTIAL_INTEGRITY_VIOLATION = 'REFERENTIAL_INTEGRITY_VIOLATION',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_DATA_ERROR = 'INTERNAL_DATA_ERROR',
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class NotFoundError extends AppError {
  constructor(entityType: string, id: string) {
    super(ErrorCode.NOT_FOUND, `${entityType} not found: ${id}`)
  }
}

export class ReferentialIntegrityError extends AppError {
  constructor(entityType: string, id: string, referencedBy: string) {
    super(
      ErrorCode.REFERENTIAL_INTEGRITY_VIOLATION,
      `${entityType} cannot be deleted, referenced by one or more ${referencedBy}: ${id}`
    )
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(ErrorCode.VALIDATION_ERROR, message)
  }
}

export class InternalDataError extends AppError {
  constructor(message: string) {
    super(ErrorCode.INTERNAL_DATA_ERROR, message)
  }
}
