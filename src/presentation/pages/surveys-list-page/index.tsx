import './styles.scss'
import { SurveysList, Error } from './components'
import { LoadSurveysList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveysProvider, useApiContext, useSurveysContext } from '@/presentation/store/context'
import { withProvider } from '@/presentation/helpers'

import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AccessDeniedError } from '@/domain/errors'

type Props = {
  loadSurveysList: LoadSurveysList
}

const SurveysListPageComponent = ({ loadSurveysList }: Props): JSX.Element => {
  const { reload, error, setSurveys, setError } = useSurveysContext()
  const { setCurrentAccount } = useApiContext()
  const history = useHistory()

  const logoutOrShowError = useCallback(async (error: Error): Promise<void> => {
    if (error instanceof AccessDeniedError) {
      await setCurrentAccount(null)
      history.replace('/login')
    } else {
      setError(error)
    }
  }, [])

  useEffect(() => {
    loadSurveysList.loadAll().then(setSurveys, logoutOrShowError)
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
