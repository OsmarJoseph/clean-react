import { iconsEnum } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/surveys/components'

import { mockSurveyModel } from '@/tests/_domain'

import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory, History } from 'history'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  history: History
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>,
  )

  return {
    history,
  }
}

describe('SurveysListPage', () => {
  test('should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: true, date: new Date('2020-01-10T00:00:00') }
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', iconsEnum.thumbUp.base64)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
  test('should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: false }
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', iconsEnum.thumbDown.base64)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
  test('should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    expect(history.location.pathname).toBe('/')

    userEvent.click(screen.getByTestId('link'))

    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
