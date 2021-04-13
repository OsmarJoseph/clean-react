import {ActionMap} from '@/presentation/store/context/types'
import {FormContextType} from '@/presentation/store/context/'

export enum FormActionsEnum {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
}

type FormPayload = {
  [FormActionsEnum.SET_IS_LOADING]: {
    isLoading: boolean
  }
  [FormActionsEnum.SET_ERROR_MESSAGE]: {
    errorMessage: string
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
