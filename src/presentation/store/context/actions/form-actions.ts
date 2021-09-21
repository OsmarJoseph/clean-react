import { FormContextType, ActionMap } from '@/presentation/store/context/'

export enum FormActionsEnum {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
  SET_INPUT_ERRORS = 'SET_INPUT_ERRORS',
  SET_INPUT_VALUES = 'SET_INPUT_VALUES',
  SET_IS_FORM_VALID = 'SET_IS_FORM_VALID',
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
  [FormActionsEnum.SET_IS_FORM_VALID]: {
    isFormValid: FormContextType['isFormValid']
  }
}

export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>]

export const setIsLoading = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['isLoading'],
) => {
  dispatch({
    type: FormActionsEnum.SET_IS_LOADING,
    payload: { isLoading: value },
  })
}

export const setErrorMessage = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['errorMessage'],
) => {
  dispatch({
    type: FormActionsEnum.SET_ERROR_MESSAGE,
    payload: { errorMessage: value },
  })
}

export const setInputErrors = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['inputErrors'],
) => {
  dispatch({
    type: FormActionsEnum.SET_INPUT_ERRORS,
    payload: { inputErrors: value },
  })
}
export const setInputValues = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['inputValues'],
) => {
  dispatch({
    type: FormActionsEnum.SET_INPUT_VALUES,
    payload: { inputValues: value },
  })
}
export const setIsFormValid = (dispatch: React.Dispatch<FormActions>) => (
  value: FormContextType['isFormValid'],
) => {
  dispatch({
    type: FormActionsEnum.SET_IS_FORM_VALID,
    payload: { isFormValid: value },
  })
}

export const FormReducer = (state: FormContextType, action: FormActions): FormContextType => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload.isLoading }
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload.errorMessage }
    case 'SET_INPUT_ERRORS':
      return { ...state, inputErrors: action.payload.inputErrors }
    case 'SET_INPUT_VALUES':
      return { ...state, inputValues: action.payload.inputValues }
    case 'SET_IS_FORM_VALID':
      return { ...state, isFormValid: action.payload.isFormValid }
  }
}
