import './styles.scss'
import { Calendar } from '@/presentation/components'
import { Answer } from '@/presentation/pages/survey-result/components'
import { useSurveyResultContext } from '@/presentation/store/context'

import React, { Fragment } from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'

export const SurveyResult = (): JSX.Element => {
  const { surveyResult } = useSurveyResultContext()
  const { goBack } = useHistory()

  return (
    <Fragment>
      <hgroup className="c-result__hgroup">
        <Calendar date={surveyResult.date} className="c-result__calendar" />
        <h2 className="c-result__title" data-testid="question">
          {surveyResult.question}
        </h2>
      </hgroup>
      <FlipMove className="c-result__items" data-testid="answers">
        <Fragment>
          {surveyResult.answers.map((answer, index) => (
            <Answer answer={answer} key={index} />
          ))}
        </Fragment>
      </FlipMove>
      <button className="c-result__back-button" onClick={goBack} data-testid="back-button">
        Voltar
      </button>
    </Fragment>
  )
}
