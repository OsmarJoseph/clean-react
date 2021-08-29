import './styles.scss'
import { useSurveysContext } from '@/presentation/store/context'
import { SurveyItem, EmptySurveyItemList } from '@/presentation/pages/surveys/components'

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
