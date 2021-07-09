import { SurveysListPage } from '@/presentation/pages'
import { makeRemoteLoadSurveysList } from '@/main/factories'

import React from 'react'

export const makeSurveysList = (): JSX.Element => {
  return <SurveysListPage loadSurveysList={makeRemoteLoadSurveysList()} />
}
