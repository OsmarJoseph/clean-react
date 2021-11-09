import { HttpClient } from '@/data/protocols'
import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpClient = <
  Constructor extends HttpClient.Constructor,
>(): AxiosHttpClient<Constructor> => {
  return new AxiosHttpClient<Constructor>()
}
