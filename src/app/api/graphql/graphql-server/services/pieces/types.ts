export type Piece = {
  id: string
  designId: string
  imageFileNames: string[]
  sold: boolean
  collectionId?: string
}

export type CreatePieceInput = {
  designId: string
  imageFileNames: string[]
  sold: boolean
  collectionId?: string
}

export type UpdatePieceInput = {
  id: string
  designId: string
  imageFileNames: string[]
  sold: boolean
  collectionId?: string
}
