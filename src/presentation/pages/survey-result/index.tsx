import './styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultProvider, useSurveyResultContext } from '@/presentation/store/context'
import { SurveyResult } from '@/presentation/pages/survey-result/components'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { withProvider } from '@/presentation/helpers'
import { useErrorHandler } from '@/presentation/hooks'

import React, { useCallback, useEffect } from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResultPage = withProvider(SurveyResultProvider)<Props>(
  ({ loadSurveyResult }: Props): JSX.Element => {
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
          {surveyResult && <SurveyResult />}
          {isLoading && <Loading />}
          {error && <Error error={error} handleReloadClick={handleReloadClick} />}
        </div>
        <Footer />
      </div>
    )
  },
)
