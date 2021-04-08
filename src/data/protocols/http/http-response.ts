export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401
}

export type HttpResponseConstructor = {
  body: unknown
}

export type HttpResponse<Constructor extends HttpResponseConstructor> = {
  statusCode: HttpStatusCode
  body: Constructor['body']
}
