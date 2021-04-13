export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpResponseConstructor = {
  body: unknown
}

export type HttpResponse<Constructor extends HttpResponseConstructor> = {
  statusCode: HttpStatusCode
  body: Constructor['body']
}
