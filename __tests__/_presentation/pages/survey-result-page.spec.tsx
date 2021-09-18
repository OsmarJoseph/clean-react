import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveyResultPage } from '@/presentation/pages'
import { Answer } from '@/presentation/pages/survey-result/components'
import { ApiProvider } from '@/presentation/store/context'

import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/tests/_domain'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  history: MemoryHistory<unknown>
  loadSurveyResultSpy: LoadSurveyResultSpy
  setCurrentAccountMock: jest.Mock<any, any>
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/surveys/any_id'], initialIndex: 1 })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiProvider
      setCurrentAccount={setCurrentAccountMock}
      getCurrentAccount={() => mockAccountModel()}
    >
      <Router history={history}>
        <SurveyResultPage loadSurveyResult={loadSurveyResultSpy} />)
      </Router>
    </ApiProvider>,
  )
  return { history, loadSurveyResultSpy, setCurrentAccountMock }
}

describe('SurveyResult', () => {
  test('should present correct initial state', async () => {
    makeSut()

    expect(screen.getByTestId('content')).toBeEmptyDOMElement()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('content'))
  })
  test('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('content'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
  test('should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = {
      ...mockSurveyResultModel(),
      date: new Date('2020-01-10T00:00:00'),
    }
    loadSurveyResultSpy.result = surveyResult
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('content'))

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)

    const answersWraps = screen.queryAllByTestId('answer-wrap')
    expect(answersWraps[0]).toHaveClass(Answer.activeClass)
    expect(answersWraps[1]).not.toHaveClass(Answer.activeClass)

    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()

    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')

    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })
  test('should render error on failure', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()

    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('content'))

    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(UnexpectedError.message)
  })
  test('should logout AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()

    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock, history } = makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('content'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(history.location.pathname).toBe('/login')
  })
  test('should call loadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveyResultSpy)

    await waitFor(() => screen.getByTestId('content'))

    userEvent.click(screen.getByTestId('reload'))

    expect(loadSurveyResultSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('content'))
  })
  test('should go to SurveyList on back button click', async () => {
    const { history } = makeSut()

    await waitFor(() => screen.getByTestId('content'))

    userEvent.click(screen.getByTestId('back-button'))

    expect(history.location.pathname).toBe('/')
  })
})
