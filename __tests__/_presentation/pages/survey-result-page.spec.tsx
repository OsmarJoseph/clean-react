import { SurveyResultPage } from '@/presentation/pages'
import { ApiProvider } from '@/presentation/store/context'

import { LoadSurveyResultSpy, mockAccountModel } from '@/tests/_domain'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'

type SutTypes = {
  history: MemoryHistory<unknown>
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const history = createMemoryHistory()
  render(
    <ApiProvider setCurrentAccount={jest.fn()} getCurrentAccount={() => mockAccountModel()}>
      <Router history={history}>
        <SurveyResultPage loadSurveyResult={loadSurveyResultSpy} />)
      </Router>
    </ApiProvider>,
  )
  return { history, loadSurveyResultSpy }
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
})
