export interface Validation {
  validate: (input: Validation.Params) => Validation.Result
}

export namespace Validation {
  export type Params = { [fieldName: string]: string }
  export type Result = string
}
