export type HttpConstructor<T extends { Params: any; Result: any }> = {
  request: { body: T['Params'] }
  response: { body: T['Result'] }
}
