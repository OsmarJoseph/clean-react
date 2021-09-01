import './styles.scss'
import { SurveysList } from './components'
import { LoadSurveysList } from '@/domain/usecases'
import { Footer, Header, Error } from '@/presentation/components'
import { SurveysProvider, useSurveysContext } from '@/presentation/store/context'
import { useErrorHandler } from '@/presentation/hooks'
import { withProvider } from '@/presentation/helpers'

import React, { useCallback, useEffect } from 'react'

type Props = {
  loadSurveysList: LoadSurveysList
}

const SurveysListPageComponent = ({ loadSurveysList }: Props): JSX.Element => {
  const { reload, error, setSurveys, setError, setReload } = useSurveysContext()
  const handleError = useErrorHandler(setError)

  useEffect(() => {
    loadSurveysList.loadAll().then(setSurveys, handleError).catch(handleError)
  }, [reload])

  const handleReloadClick = useCallback(() => {
    setSurveys([])
    setError(undefined)
    setReload(!reload)
  }, [])

  return (
    <div className="c-surveys">
      <Header />
      <div className="c-surveys__content">
        <h2 className="c-surveys__title">Enquetes</h2>
        {error ? <Error error={error} handleReloadClick={handleReloadClick} /> : <SurveysList />}
      </div>
      <Footer />
    </div>
  )
}

export const SurveysListPage = withProvider(SurveysProvider)<Props>(SurveysListPageComponent)
