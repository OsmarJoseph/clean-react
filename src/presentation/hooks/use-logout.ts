import { useApiContext } from '@/presentation/store/context'

import { useHistory } from 'react-router-dom'

type ResultType = () => Promise<void>

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useApiContext()

  return async () => {
    await setCurrentAccount(null)
    history.replace('/login')
  }
}
