import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from '@/presentation/hooks'

type CallbackType = (error: Error) => void
type ResultType = (error: Error) => Promise<void>

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logout = useLogout()

  return async (error: Error) => {
    if (error instanceof AccessDeniedError) {
      await logout()
    } else {
      callback(error)
    }
  }
}
