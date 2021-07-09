import { UnexpectedError } from '@/domain/errors'
import { SurveysListPage } from '@/presentation/pages'

import { LoadSurveysListSpy } from '@/tests/_domain/mocks'

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  loadSurveysListSpy: LoadSurveysListSpy
}

const makeSut = (loadSurveysListSpy = new LoadSurveysListSpy()): SutTypes => {
  render(<SurveysListPage loadSurveysList={loadSurveysListSpy} />)
  return { loadSurveysListSpy }
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
