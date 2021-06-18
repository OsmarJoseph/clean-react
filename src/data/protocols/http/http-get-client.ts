import { HttpResponse } from '@/data/protocols'

export interface HttpGetClient<Constructor extends HttpGetClient.Constructor> {
  get: (params: HttpGetClient.Params) => Promise<HttpResponse<Constructor['response']>>
}

export namespace HttpGetClient {
  export type Constructor = {
    request?: { headers?: unknown }
    response: { body: unknown }
  }

  export type Params = {
    url: string
  }
}
