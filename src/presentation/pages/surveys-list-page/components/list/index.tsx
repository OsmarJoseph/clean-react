import './styles.scss'
import { SurveyItem, EmptySurveyItemList } from '..'
import { useSurveysContext } from '@/presentation/store/context'

import React from 'react'

export const SurveysList = (): JSX.Element => {
  const { surveys } = useSurveysContext()

  return (
    <ul className="c-surveys-list" data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
      ) : (
        <EmptySurveyItemList />
      )}
    </ul>
  )
}
