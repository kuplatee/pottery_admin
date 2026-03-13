import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { generateUploadSignature } from '../../../../services/cloudinary/cloudinaryService'

export const getUploadSignature: NonNullable<
  MutationResolvers['getUploadSignature']
> = () => {
  return generateUploadSignature()
}
