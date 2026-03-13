import { AppError } from './AppError'

const ORANGE = '\x1b[38;5;208m'
const RESET = '\x1b[0m'

export const logger = {
  logAppError(error: AppError): void {
    const timestamp = new Date().toISOString()
    const [stackFirstLine, ...stackFrames] = (error.stack ?? '').split('\n')
    const customPart = `${ORANGE}[${timestamp}] [${error.code}] ${error.message}\n${stackFirstLine}${RESET}`
    const stackPart = stackFrames.length > 0 ? `\n${stackFrames.join('\n')}` : ''
    console.warn(`${customPart}${stackPart}`)
  },

  logInternalError(error: Error): void {
    const timestamp = new Date().toISOString()
    console.error(`[${timestamp}] [INTERNAL_ERROR] ${error.message}\n${error.stack}`)
  },
}
