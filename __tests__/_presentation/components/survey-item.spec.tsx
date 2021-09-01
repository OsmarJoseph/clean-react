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
    const survey = { ...mockSurveyModel(), didAnswer: true }
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', iconsEnum.thumbUp.base64)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
  test('should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: false }
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', iconsEnum.thumbDown.base64)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
