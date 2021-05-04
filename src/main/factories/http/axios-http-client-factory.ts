import { HttpPostClient } from '@/data/protocols'
import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpClient = <
  Constructor extends HttpPostClient.Constructor
>(): AxiosHttpClient<Constructor> => {
  return new AxiosHttpClient<Constructor>()
}
