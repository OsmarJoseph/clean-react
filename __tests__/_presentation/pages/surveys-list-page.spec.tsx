import { AccountModel } from '@/domain/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveysListPage } from '@/presentation/pages'
import { ApiProvider } from '@/presentation/store/context'

import { LoadSurveysListSpy, mockAccountModel } from '@/tests/_domain'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  loadSurveysListSpy: LoadSurveysListSpy
  history: MemoryHistory<unknown>
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveysListSpy = new LoadSurveysListSpy()): SutTypes => {
  const history = createMemoryHistory()
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiProvider
      setCurrentAccount={setCurrentAccountMock}
      getCurrentAccount={() => mockAccountModel()}
    >
      <Router history={history}>
        <SurveysListPage loadSurveysList={loadSurveysListSpy} />)
      </Router>
    </ApiProvider>,
  )
  return { loadSurveysListSpy, history, setCurrentAccountMock }
}

describe('SurveysListPage', () => {
  test('should present 4 empty items on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('[data-testid="empty-survey-item"]:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })
  test('should present 4 empty items on start', async () => {
    const { loadSurveysListSpy } = makeSut()
    expect(loadSurveysListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
  test('should render survey items on success', async () => {
    const { loadSurveysListSpy } = makeSut()

    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('[data-testid="survey-item"]')).toHaveLength(
      loadSurveysListSpy.result.length,
    )
  })
  test('should render error on failure', async () => {
    const loadSurveysListSpy = new LoadSurveysListSpy()
    jest.spyOn(loadSurveysListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveysListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(UnexpectedError.message)
  })
  test('should render logout on AccessDeniedError', async () => {
    const loadSurveysListSpy = new LoadSurveysListSpy()
    jest.spyOn(loadSurveysListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut(loadSurveysListSpy)

    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(history.location.pathname).toBe('/login')
  })
  test('should call loadSurveysList on reload', async () => {
    const loadSurveysListSpy = new LoadSurveysListSpy()
    jest.spyOn(loadSurveysListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveysListSpy)

    await waitFor(() => screen.getByRole('heading'))
    userEvent.click(screen.getByTestId('reload'))

    expect(loadSurveysListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
