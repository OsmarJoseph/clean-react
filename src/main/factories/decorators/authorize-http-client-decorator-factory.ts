import { HttpClient } from '@/data/protocols'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter, makeAxiosHttpClient } from '@/main/factories'

export const makeAuthorizeHttpClientDecorator = <
  Constructor extends HttpClient.Constructor,
>(): HttpClient<Constructor> => {
  return new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient<Constructor>(),
  )
}
