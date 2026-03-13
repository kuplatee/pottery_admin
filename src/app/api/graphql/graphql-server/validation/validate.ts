import type { ValidateFunction } from 'ajv'
import { ValidationError } from '../errors/AppError'

export function validateInput<T>(validator: ValidateFunction<T>, data: unknown): asserts data is T {
  if (!validator(data)) {
    const messages =
      validator.errors
        ?.map((e) => `${e.instancePath ? e.instancePath.replace(/^\//, '') : 'input'}: ${e.message}`)
        .join('; ') ?? 'Validation failed'
    throw new ValidationError(messages)
  }
}
