import { SurveyResultContextType, ActionMap } from '@/presentation/store/context/'

export enum SurveyResultActionsEnum {
  SET_SURVEY_RESULT = 'SET_SURVEY_RESULT',
  SET_ERROR = 'SET_ERROR',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_RELOAD = 'SET_RELOAD',
}

type SurveyResultPayload = {
  [SurveyResultActionsEnum.SET_SURVEY_RESULT]: {
    surveyResult: SurveyResultContextType['surveyResult']
  }
  [SurveyResultActionsEnum.SET_ERROR]: {
    error: SurveyResultContextType['error']
  }
  [SurveyResultActionsEnum.SET_IS_LOADING]: {
    isLoading: SurveyResultContextType['isLoading']
  }
  [SurveyResultActionsEnum.SET_RELOAD]: {
    reload: SurveyResultContextType['reload']
  }
}

export type SurveyResultActions = ActionMap<SurveyResultPayload>[keyof ActionMap<SurveyResultPayload>]

export const setSurveyResult = (dispatch: React.Dispatch<SurveyResultActions>) => (
  value: SurveyResultContextType['surveyResult'],
) => {
  dispatch({
    type: SurveyResultActionsEnum.SET_SURVEY_RESULT,
    payload: { surveyResult: value },
  })
}

export const setError = (dispatch: React.Dispatch<SurveyResultActions>) => (
  value: SurveyResultContextType['error'],
) => {
  dispatch({
    type: SurveyResultActionsEnum.SET_ERROR,
    payload: { error: value },
  })
}
export const setIsLoading = (dispatch: React.Dispatch<SurveyResultActions>) => (
  value: SurveyResultContextType['isLoading'],
) => {
  dispatch({
    type: SurveyResultActionsEnum.SET_IS_LOADING,
    payload: { isLoading: value },
  })
}

export const setReload = (dispatch: React.Dispatch<SurveyResultActions>) => (
  value: SurveyResultContextType['reload'],
) => {
  dispatch({
    type: SurveyResultActionsEnum.SET_RELOAD,
    payload: { reload: value },
  })
}
