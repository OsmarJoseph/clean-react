import {FormActions, setIsLoading} from '@/presentation/store/context'

import React, {createContext, useContext, useReducer} from 'react'
import {setErrorMessage} from '../actions'

export type FormContextType = {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  errorMessage: string
  setErrorMessage: (value: string) => void
}

const initialState = {
  isLoading: false,
  setIsLoading: (value: boolean) => value,
  errorMessage: '',
  setErrorMessage: (value: string) => value,
}

const FormContext = createContext<FormContextType>(initialState)

export const FormReducer = (
  state: FormContextType,
  action: FormActions
): FormContextType => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return {...state, isLoading: action.payload.isLoading}
    case 'SET_ERROR_MESSAGE':
      return {...state, errorMessage: action.payload.errorMessage}
    default:
      return state
  }
}

export function FormProvider({children}: {children: JSX.Element}): JSX.Element {
  const [state, dispatch] = useReducer(FormReducer, initialState)
  const value = {
    isLoading: state.isLoading,
    setIsLoading: setIsLoading(dispatch),
    errorMessage: state.errorMessage,
    setErrorMessage: setErrorMessage(dispatch),
  }
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = (): FormContextType => useContext(FormContext)
