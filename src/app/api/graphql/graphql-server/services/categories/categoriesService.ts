import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../../modules/generated-types-and-defs/resolverTypes.generated'

export async function getCategories(): Promise<Category[]> {
  throw new Error('Not implemented')
}

export async function getCategory(_id: string): Promise<Category | null | undefined> {
  throw new Error('Not implemented')
}

export async function createCategory(_input: CreateCategoryInput): Promise<Category> {
  throw new Error('Not implemented')
}

export async function updateCategory(_input: UpdateCategoryInput): Promise<Category> {
  throw new Error('Not implemented')
}

export async function deleteCategory(_id: string): Promise<string> {
  throw new Error('Not implemented')
}
