import { HttpGetClient } from '@/data/protocols'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter, makeAxiosHttpGetClient } from '@/main/factories'

export const makeAuthorizeHttpGetClientDecorator = <
  Constructor extends HttpGetClient.Constructor
>(): HttpGetClient<Constructor> => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpGetClient<Constructor>(),
  )
}
