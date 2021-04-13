import {HttpResponse} from '@/data/protocols'

export interface HttpPostClient<
  Constructor extends HttpPostClient.Constructor
> {
  post: (
    params: HttpPostClient.Params<Constructor['request']>
  ) => Promise<HttpResponse<Constructor['response']>>
}

export namespace HttpPostClient {
  export type Constructor = {
    request: {body: unknown}
    response: {body: unknown}
  }

  export type Params<
    ParamTypes extends HttpPostClient.Constructor['request']
  > = {
    url: string
    body: ParamTypes['body']
  }
}
