export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export interface HttpClient<Constructor extends HttpClient.Constructor> {
  request: (
    data: HttpClient.Request<Constructor['request']>,
  ) => Promise<HttpClient.Response<Constructor['response']>>
}

export namespace HttpClient {
  export type Constructor = {
    request?: { body?: unknown; headers?: Record<string, string> }
    response: { body: unknown }
  }

  export type Method = 'get' | 'post' | 'put' | 'delete'

  export type Request<ParamTypes extends HttpClient.Constructor['request']> = {
    url: string
    method: HttpClient.Method
    headers?: ParamTypes['headers']
    body?: ParamTypes['body']
  }
  export type Response<Constructor extends HttpClient.Constructor['response']> = {
    statusCode: HttpStatusCode
    body: Constructor['body']
  }
}
