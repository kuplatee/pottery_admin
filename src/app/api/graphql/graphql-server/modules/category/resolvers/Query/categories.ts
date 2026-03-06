import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getAllCategories } from '../../../../services/categories/categoriesService'

export const categories: NonNullable<QueryResolvers['categories']> = async (
  _parent,
  _arg,
  _ctx
) => {
  // TODO: REMOVE BEFORE COMMIT — temporary dummy data for dev
  return [
    { id: '1', names: { en: 'Cups & mugs', fi: 'Kupit & mukit' } },
    { id: '2', names: { en: 'Bowls', fi: 'Kulhot' } },
    { id: '3', names: { en: 'Plates', fi: 'Lautaset' } },
    { id: '4', names: { en: 'Vases', fi: 'Maljakot' } },
    { id: '5', names: { en: 'Jugs & pitchers', fi: 'Kannut & karahvit' } },
    { id: '6', names: { en: 'Candle holders', fi: 'Kynttilänjalat' } },
  ]
}
