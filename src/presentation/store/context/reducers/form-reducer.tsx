import {
  FormReducer,
  setIsLoading,
  setErrorMessage,
  setInputValues,
  setInputErrors,
  setIsFormValid,
} from '@/presentation/store/context'

import React, { createContext, useContext, useReducer } from 'react'

export type FormInputs = {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export type FormContextType = {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  errorMessage: string
  setErrorMessage: (value: string) => void
  inputValues: FormInputs
  setInputValues: (value: FormContextType['inputValues']) => void
  inputErrors: FormInputs
  setInputErrors: (value: FormContextType['inputErrors']) => void
  isFormValid: boolean
  setIsFormValid: (value: boolean) => void
}

export const initialState = {
  isLoading: false,
  setIsLoading: (value: boolean) => value,
  errorMessage: '',
  setErrorMessage: (value: string) => value,
  inputValues: { name: '', email: '', password: '', passwordConfirmation: '' },
  setInputValues: (value: FormContextType['inputValues']) => value,
  inputErrors: {
    name: 'Campo obrigatório',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    passwordConfirmation: 'Campo obrigatório',
  },
  isFormValid: false,
  setInputErrors: (value: FormContextType['inputErrors']) => value,
  setIsFormValid: (value: boolean) => value,
}

const FormContext = createContext<FormContextType>(initialState)

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
    isFormValid: state.isFormValid,
    setIsFormValid: setIsFormValid(dispatch),
  }
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = (): FormContextType => useContext(FormContext)
