import { iconsEnum } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/surveys/components'

import { mockSurveyModel } from '@/tests/_domain'

import React from 'react'
import { render, screen } from '@testing-library/react'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
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
    const survey = { ...mockSurveyModel(), didAnswer: false, date: new Date('2019-05-03T00:00:00') }
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', iconsEnum.thumbDown.base64)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
