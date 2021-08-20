import './styles.scss'
import { SurveysList, Error } from './components'
import { LoadSurveysList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveysProvider, useSurveysContext } from '@/presentation/store/context'
import { useErrorHandler } from '@/presentation/hooks'
import { withProvider } from '@/presentation/helpers'

import React, { useEffect } from 'react'

type Props = {
  loadSurveysList: LoadSurveysList
}

const SurveysListPageComponent = ({ loadSurveysList }: Props): JSX.Element => {
  const { reload, error, setSurveys, setError } = useSurveysContext()
  const handleError = useErrorHandler(setError)

  useEffect(() => {
    loadSurveysList.loadAll().then(setSurveys, handleError).catch(handleError)
  }, [reload])

  return (
    <div className="c-surveys">
      <Header />
      <div className="c-surveys__content">
        <h2 className="c-surveys__title">Enquetes</h2>
        {error ? <Error /> : <SurveysList />}
      </div>
      <Footer />
    </div>
  )
}

export const SurveysListPage = withProvider(SurveysProvider)<Props>(SurveysListPageComponent)
