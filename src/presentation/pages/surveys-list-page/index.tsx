import './styles.scss'
import { SurveysList, Error } from './components'
import { LoadSurveysList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveysProvider, useSurveysContext } from '@/presentation/store/context'

import React, { useEffect } from 'react'
import { withProvider } from '@/presentation/helpers'

type Props = {
  loadSurveysList: LoadSurveysList
}

const SurveysListPageComponent = ({ loadSurveysList }: Props): JSX.Element => {
  const { reload, error, setSurveys, setError } = useSurveysContext()
  useEffect(() => {
    try {
      loadSurveysList.loadAll().then(setSurveys, setError)
    } catch (error) {
      setError(error)
    }
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
