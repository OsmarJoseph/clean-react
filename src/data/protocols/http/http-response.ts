export enum HttpStatusCode {
  unauthorized = 401
}

export type HttpResponseConstructor = {
  body: unknown
}

export type HttpResponse<Constructor extends HttpResponseConstructor> = {
  statusCode: HttpStatusCode
  body: Constructor['body']
}
