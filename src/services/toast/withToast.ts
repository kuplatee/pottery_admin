import { toastService } from './toastService'

export async function withToast<T>(
  fn: () => Promise<T>,
  messages: { success?: string; error: string }
): Promise<T | undefined> {
  try {
    const result = await fn()
    if (messages.success) { toastService.success(messages.success) }
    return result
  } catch {
    toastService.error(messages.error)
  }
}
