import {FormContextType} from '@/presentation/store/context/'

export enum FormActionsEnum {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
  SET_INPUT_ERRORS = 'SET_INPUT_ERRORS',
  SET_INPUT_VALUES = 'SET_INPUT_VALUES',
}

type FormPayload = {
  [FormActionsEnum.SET_IS_LOADING]: {
    isLoading: FormContextType['isLoading']
  }
  [FormActionsEnum.SET_ERROR_MESSAGE]: {
    errorMessage: FormContextType['errorMessage']
  }
  [FormActionsEnum.SET_INPUT_ERRORS]: {
    inputErrors: FormContextType['inputErrors']
  }
  [FormActionsEnum.SET_INPUT_VALUES]: {
    inputValues: FormContextType['inputValues']
  }
}

export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>]

export const setIsLoading = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['isLoading']
) => {
  dispatch({
    type: FormActionsEnum.SET_IS_LOADING,
    payload: {isLoading: value},
  })
}

export const setErrorMessage = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['errorMessage']
) => {
  dispatch({
    type: FormActionsEnum.SET_ERROR_MESSAGE,
    payload: {errorMessage: value},
  })
}

export const setInputErrors = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['inputErrors']
) => {
  dispatch({
    type: FormActionsEnum.SET_INPUT_ERRORS,
    payload: {inputErrors: value},
  })
}
export const setInputValues = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['inputValues']
) => {
  dispatch({
    type: FormActionsEnum.SET_INPUT_VALUES,
    payload: {inputValues: value},
  })
}
