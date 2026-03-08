import { z } from 'zod'
import { SUPPORTED_LANGUAGES, type Language } from '@/lib/languages'
import type { EntityFieldConfig } from '../types/entity.types'

function buildMultilingualSchema() {
  return z.object(
    Object.fromEntries(
      SUPPORTED_LANGUAGES.map((lang) => [lang, z.string().min(1, 'Required')])
    ) as Record<Language, z.ZodString>
  )
}

export const detailEntrySchema = z.object({
  key: buildMultilingualSchema(),
  value: buildMultilingualSchema()
})

export function buildSchema(config: EntityFieldConfig) {
  const multilingualText = buildMultilingualSchema()

  return z.object({
    ...(config.names && { names: multilingualText }),
    ...(config.description && { description: multilingualText }),
    ...(config.details && { details: z.array(detailEntrySchema) }),
    ...(config.categoryIds && {
      categoryIds: z.array(z.string()).min(1, 'Select at least one category')
    })
  })
}
