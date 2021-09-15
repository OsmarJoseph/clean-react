import { makeRemoteLoadSurveyResult } from '@/main/factories'
import { SurveyResultPage } from '@/presentation/pages'

import React from 'react'
import { useParams } from 'react-router-dom'

export const makeSurveyResult = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  return <SurveyResultPage loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
}
