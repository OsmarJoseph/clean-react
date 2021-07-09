import { HttpGetClient, HttpPostClient } from '@/data/protocols'
import { AxiosHttpGetClient, AxiosHttpPostClient } from '@/infra/http'

export const makeAxiosHttpGetClient = <
  Constructor extends HttpGetClient.Constructor
>(): AxiosHttpGetClient<Constructor> => {
  return new AxiosHttpGetClient<Constructor>()
}
export const makeAxiosHttpPostClient = <
  Constructor extends HttpPostClient.Constructor
>(): AxiosHttpPostClient<Constructor> => {
  return new AxiosHttpPostClient<Constructor>()
}
