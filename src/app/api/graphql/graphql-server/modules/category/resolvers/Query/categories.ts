import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getAllCategories } from '../../../../services/categories/categoriesService'

export const categories: NonNullable<QueryResolvers['categories']> = async (
  _parent,
  _arg,
  _ctx
) => {
  // TODO: REMOVE BEFORE COMMIT — temporary dummy data for dev
  return [
    { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', names: { en: 'Cups & mugs', fi: 'Kupit & mukit' } },
    { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', names: { en: 'Bowls', fi: 'Kulhot' } },
    { id: 'c3d4e5f6-a7b8-9012-cdef-123456789012', names: { en: 'Plates', fi: 'Lautaset' } },
    { id: 'd4e5f6a7-b8c9-0123-defa-234567890123', names: { en: 'Vases', fi: 'Maljakot' } },
    { id: 'e5f6a7b8-c9d0-1234-efab-345678901234', names: { en: 'Jugs & pitchers', fi: 'Kannut & karahvit' } },
    { id: 'f6a7b8c9-d0e1-2345-fabc-456789012345', names: { en: 'Candle holders', fi: 'Kynttilänjalat' } },
  ]
}
