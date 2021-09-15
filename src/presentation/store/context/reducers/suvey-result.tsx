import { SurveyResult } from '@/domain/models'
import {
  setError,
  setIsLoading,
  setSurveyResult,
  SurveyResultActions,
  setReload,
} from '@/presentation/store/context/actions/survey-result-actions'

import React, { createContext, useContext, useReducer } from 'react'

export type SurveyResultContextType = {
  surveyResult: SurveyResult
  setSurveyResult: (surveyResult: SurveyResult) => void
  error: Error | undefined
  setError: (error: Error) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  reload: boolean
  setReload: (reload: boolean) => void
}

export const surveyResultInitialState: SurveyResultContextType = {
  surveyResult: null as SurveyResult,
  setSurveyResult: (surveyResult: SurveyResult) => surveyResult,
  error: undefined,
  setError: (error: Error) => error,
  isLoading: false,
  setIsLoading: (isLoading: boolean) => isLoading,
  reload: false,
  setReload: (reload: boolean) => reload,
}

export const SurveyResultReducer = (
  state: SurveyResultContextType,
  action: SurveyResultActions,
): SurveyResultContextType => {
  switch (action.type) {
    case 'SET_SURVEY_RESULT':
      return { ...state, surveyResult: action.payload.surveyResult }
    case 'SET_ERROR':
      return { ...state, error: action.payload.error }
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload.isLoading }
    case 'SET_RELOAD':
      return { ...state, reload: action.payload.reload }
  }
}

const SurveyResultContext = createContext<SurveyResultContextType>(surveyResultInitialState)

export function SurveyResultProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [state, dispatch] = useReducer(SurveyResultReducer, surveyResultInitialState)
  const value = {
    surveyResult: state.surveyResult,
    setSurveyResult: setSurveyResult(dispatch),
    error: state.error,
    setError: setError(dispatch),
    isLoading: state.isLoading,
    setIsLoading: setIsLoading(dispatch),
    reload: state.reload,
    setReload: setReload(dispatch),
  }
  return <SurveyResultContext.Provider value={value}>{children}</SurveyResultContext.Provider>
}

export const useSurveyResultContext = (): SurveyResultContextType => useContext(SurveyResultContext)
