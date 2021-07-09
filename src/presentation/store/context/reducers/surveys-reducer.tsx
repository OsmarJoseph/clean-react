import { SurveyModel } from '@/domain/models'
import { setError, setReload, setSurveys, SurveysActions } from '@/presentation/store/context'

import React, { createContext, useContext, useReducer } from 'react'

export type SurveysContextType = {
  surveys: SurveyModel[]
  setSurveys: (surveys: SurveyModel[]) => void
  error: Error | undefined
  setError: (error: Error) => void
  reload: boolean
  setReload: (reload: boolean) => void
}

const initialState: SurveysContextType = {
  surveys: [],
  setSurveys: (surveys: SurveyModel[]) => surveys,
  error: undefined,
  setError: (error: Error) => error,
  reload: false,
  setReload: (reload: boolean) => reload,
}

export const SurveysReducer = (
  state: SurveysContextType,
  action: SurveysActions,
): SurveysContextType => {
  switch (action.type) {
    case 'SET_SURVEYS':
      return { ...state, surveys: action.payload.surveys }
    case 'SET_ERROR':
      return { ...state, error: action.payload.error }
    case 'SET_RELOAD':
      return { ...state, reload: action.payload.reload }
  }
}

const SurveysContext = createContext<SurveysContextType>(initialState)

export function SurveysProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [state, dispatch] = useReducer(SurveysReducer, initialState)
  const value = {
    surveys: state.surveys,
    setSurveys: setSurveys(dispatch),
    error: state.error,
    setError: setError(dispatch),
    reload: state.reload,
    setReload: setReload(dispatch),
  }
  return <SurveysContext.Provider value={value}>{children}</SurveysContext.Provider>
}

export const useSurveysContext = (): SurveysContextType => useContext(SurveysContext)
