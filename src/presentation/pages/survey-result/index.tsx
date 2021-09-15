import './styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultProvider, useSurveyResultContext } from '@/presentation/store/context'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { withProvider } from '@/presentation/helpers'
import { useErrorHandler } from '@/presentation/hooks'

import React, { Fragment, useCallback, useEffect } from 'react'
import FlipMove from 'react-flip-move'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const activeClass = 'active'

const SurveyResultPageComponent = ({ loadSurveyResult }: Props): JSX.Element => {
  const {
    isLoading,
    error,
    surveyResult,
    setSurveyResult,
    setError,
    reload,
    setReload,
  } = useSurveyResultContext()

  const handleError = useErrorHandler(setError)

  useEffect(
    function loadSurveysResult() {
      loadSurveyResult.load().then(setSurveyResult, handleError).catch(handleError)
    },
    [reload],
  )

  const handleReloadClick = useCallback(() => {
    setSurveyResult(null)
    setError(undefined)
    setReload(!reload)
  }, [])

  return (
    <div className="c-survey-result">
      <Header />
      <div data-testid="content" className="c-survey-result__content">
        {surveyResult && (
          <Fragment>
            <hgroup className="c-survey-result__hgroup">
              <Calendar date={surveyResult.date} className="c-survey-result__calendar" />
              <h2 className="c-survey-result__title" data-testid="question">
                {surveyResult.question}
              </h2>
            </hgroup>
            <FlipMove className="c-survey-result__items" data-testid="answers">
              {surveyResult.answers.map(
                ({ image, answer, percent, isCurrentAccountAnswer }, index) => (
                  <li
                    key={index}
                    className={`c-survey-result__item ${isCurrentAccountAnswer ? activeClass : ''}`}
                    data-testid="answer-wrap"
                  >
                    {image && (
                      <img
                        src={image}
                        alt={answer}
                        className="c-survey-result__item-image"
                        data-testid="image"
                      />
                    )}
                    <span className="c-survey-result__answer" data-testid="answer">
                      {answer}
                    </span>
                    <span className="c-survey-result__percentage" data-testid="percent ">
                      {percent}%
                    </span>
                  </li>
                ),
              )}
            </FlipMove>
            <button className="c-survey-result__back-button">Voltar</button>
          </Fragment>
        )}
        {isLoading && <Loading />}
        {error && <Error error={error} handleReloadClick={handleReloadClick} />}
      </div>
      <Footer />
    </div>
  )
}

const SurveyResultPageWithProvider = withProvider(SurveyResultProvider)<Props>(
  SurveyResultPageComponent,
)

const SurveyResultPage = Object.assign(SurveyResultPageWithProvider, { activeClass })

export { SurveyResultPage }
