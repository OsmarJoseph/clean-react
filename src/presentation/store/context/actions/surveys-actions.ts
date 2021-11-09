import { SurveysContextType, ActionMap } from '@/presentation/store/context/'

export enum SurveysActionsEnum {
  SET_SURVEYS = 'SET_SURVEYS',
  SET_ERROR = 'SET_ERROR',
  SET_RELOAD = 'SET_RELOAD',
}

type SurveysPayload = {
  [SurveysActionsEnum.SET_SURVEYS]: {
    surveys: SurveysContextType['surveys']
  }
  [SurveysActionsEnum.SET_ERROR]: {
    error: SurveysContextType['error']
  }
  [SurveysActionsEnum.SET_RELOAD]: {
    reload: SurveysContextType['reload']
  }
}

export type SurveysActions = ActionMap<SurveysPayload>[keyof ActionMap<SurveysPayload>]

export const setSurveys =
  (dispatch: React.Dispatch<SurveysActions>) => (value: SurveysContextType['surveys']) => {
    dispatch({
      type: SurveysActionsEnum.SET_SURVEYS,
      payload: { surveys: value },
    })
  }

export const setError =
  (dispatch: React.Dispatch<SurveysActions>) => (value: SurveysContextType['error']) => {
    dispatch({
      type: SurveysActionsEnum.SET_ERROR,
      payload: { error: value },
    })
  }
export const setReload =
  (dispatch: React.Dispatch<SurveysActions>) => (value: SurveysContextType['reload']) => {
    dispatch({
      type: SurveysActionsEnum.SET_RELOAD,
      payload: { reload: value },
    })
  }
