import './styles.scss'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { SurveyResultProvider, useSurveyResultContext } from '@/presentation/store/context'
import { SurveyResult } from '@/presentation/pages/survey-result/components'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { withProvider } from '@/presentation/helpers'
import { useErrorHandler } from '@/presentation/hooks'

import React, { useCallback, useEffect } from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export const SurveyResultPage = withProvider(SurveyResultProvider)<Props>(
  ({ loadSurveyResult, saveSurveyResult }: Props): JSX.Element => {
    const {
      setIsLoading,
      isLoading,
      error,
      surveyResult,
      setSurveyResult,
      setError,
      reload,
      setReload,
      setOnAnswer,
    } = useSurveyResultContext()

    const handleError = useErrorHandler((error) => {
      setSurveyResult(null)
      setError(error)
    })

    useEffect(
      function loadSurveysResult() {
        loadSurveyResult.load().then(setSurveyResult).catch(handleError).finally(setIsLoading)
      },
      [reload],
    )

    useEffect(
      setOnAnswer((answer) => {
        setIsLoading(true)
        saveSurveyResult
          .save({ answer })
          .then(setSurveyResult)
          .catch(handleError)
          .finally(setIsLoading)
      }),
      [],
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
          {surveyResult && <SurveyResult />}
          {isLoading && <Loading />}
          {error && <Error error={error} handleReloadClick={handleReloadClick} />}
        </div>
        <Footer />
      </div>
    )
  },
)
