import './styles.scss'
import { SurveyResult } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'

import React, { Fragment, useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResultPage = ({ loadSurveyResult }: Props): JSX.Element => {
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState()
  const [surveyResult, setSurveyResult] = useState<SurveyResult>()

  useEffect(function loadSurveysResult() {
    loadSurveyResult
      .load()
      .then(() => {})
      .catch(() => {})
  }, [])
  return (
    <div className="c-survey-result">
      <Header />
      <div data-testid="content" className="c-survey-result__content">
        {surveyResult && (
          <Fragment>
            <hgroup className="c-survey-result__hgroup">
              <Calendar date={new Date()} className="c-survey-result__calendar" />
              <h2 className="c-survey-result__title">Pergunta</h2>
            </hgroup>
            <FlipMove className="c-survey-result__items">
              <li className="c-survey-result__item">
                <img src="" alt="" className="c-survey-result__item-image" />
                <span className="c-survey-result__item-answer">React</span>
                <span className="c-survey-result__item-percent">50%</span>
              </li>
            </FlipMove>
            <button className="c-survey-result__back-button">Voltar</button>
            {isLoading && <Loading />}
            {error && <Error error={error} handleReloadClick={() => {}} />}
          </Fragment>
        )}
      </div>
      <Footer />
    </div>
  )
}
