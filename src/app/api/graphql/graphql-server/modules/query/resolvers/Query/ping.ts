import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
export const ping: NonNullable<QueryResolvers['ping']> = async (
  _parent,
  _arg,
  _ctx
) => {
  return 'pong'
}
