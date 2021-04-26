import {
  FormActions,
  setIsLoading,
  setErrorMessage,
  setInputValues,
  setInputErrors,
} from '@/presentation/store/context'

import React, { createContext, useContext, useReducer } from 'react'

export type FormInputs = { email: string; password: string }

export type FormContextType = {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  errorMessage: string
  setErrorMessage: (value: string) => void
  inputValues: FormInputs
  setInputValues: (value: FormContextType['inputValues']) => void
  inputErrors: FormInputs
  setInputErrors: (value: FormContextType['inputErrors']) => void
}

const initialState = {
  isLoading: false,
  setIsLoading: (value: boolean) => value,
  errorMessage: '',
  setErrorMessage: (value: string) => value,
  inputValues: { email: '', password: '' },
  setInputValues: (value: FormContextType['inputValues']) => value,
  inputErrors: { email: 'Campo obrigatório', password: 'Campo obrigatório' },
  setInputErrors: (value: FormContextType['inputErrors']) => value,
}

const FormContext = createContext<FormContextType>(initialState)

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
    default:
      return state
  }
}

export function FormProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [state, dispatch] = useReducer(FormReducer, initialState)
  const value = {
    isLoading: state.isLoading,
    setIsLoading: setIsLoading(dispatch),
    errorMessage: state.errorMessage,
    setErrorMessage: setErrorMessage(dispatch),
    inputValues: state.inputValues,
    setInputValues: setInputValues(dispatch),
    inputErrors: state.inputErrors,
    setInputErrors: setInputErrors(dispatch),
  }
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = (): FormContextType => useContext(FormContext)
