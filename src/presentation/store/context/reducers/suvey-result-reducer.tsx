import { ResultAnswer, SurveyResult } from '@/domain/models'
import {
  setError,
  setIsLoading,
  setSurveyResult,
  SurveyResultActions,
  setReload,
  setOnAnswer,
} from '@/presentation/store/context/actions/survey-result-actions'

import React, { createContext, useContext, useReducer } from 'react'

export type SurveyResultContextType = {
  surveyResult: SurveyResult
  setSurveyResult: (surveyResult: SurveyResult) => void
  error: Error | undefined
  setError: (error: Error) => void
  isLoading: boolean
  setIsLoading: (isLoading?: boolean) => void
  reload: boolean
  setReload: (reload: boolean) => void
  onAnswer: (answer: ResultAnswer['answer']) => void
  setOnAnswer: (onAnswer: SurveyResultContextType['onAnswer']) => () => void
}

export const surveyResultInitialState: SurveyResultContextType = {
  surveyResult: null as SurveyResult,
  setSurveyResult: () => null,
  error: undefined,
  setError: () => null,
  isLoading: false,
  setIsLoading: () => null,
  reload: false,
  setReload: () => null,
  onAnswer: () => null,
  setOnAnswer: () => null,
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
    case 'SET_ON_ANSWER':
      return { ...state, onAnswer: action.payload.onAnswer }
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
    onAnswer: state.onAnswer,
    setOnAnswer: setOnAnswer(dispatch),
  }
  return <SurveyResultContext.Provider value={value}>{children}</SurveyResultContext.Provider>
}

export const useSurveyResultContext = (): SurveyResultContextType => useContext(SurveyResultContext)
