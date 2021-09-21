import { UnexpectedError } from '@/domain/errors'

import { mockSurveyResultModel } from '@/tests/_domain'
import { survey, mockAccountStorage, testUrl } from '@/tests/cypress'

describe('SurveyResult', () => {
  beforeEach(() => {
    mockAccountStorage()
  })
  it('should present error on UnexpectedError', () => {
    survey.mockUnexpectedError()
    cy.visit('/surveys/any_id')

    cy.getByTestId('error').should('contain.text', UnexpectedError.message)
  })
  it('should reload on button click', () => {
    survey.mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', UnexpectedError.message)
    survey.mockSuccessResultRequest()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })
  it('should logout on AccessDeniedError', () => {
    survey.mockAccessDeniedError()
    cy.visit('/surveys/any_id')

    testUrl('/login')
  })

  it('should present survey result', () => {
    const surveyResult = mockSurveyResultModel()

    surveyResult.date = new Date('2019-06-20T00:00:00')

    survey.mockSuccessResultRequest(surveyResult)

    cy.visit('/surveys/any_id')

    cy.getByTestId('day').should('contain.text', '20')
    cy.getByTestId('month').should('contain.text', 'jun')
    cy.getByTestId('year').should('contain.text', '2019')

    cy.getByTestId('question').should('contain.text', surveyResult.question)
    const [firstResult, secondResult] = surveyResult.answers

    cy.getByTestId('answer-wrap')
      .eq(0)
      .should('have.class', 'c-result-answer--active')
      .find('image', { id: true })
      .should('have.attr', 'src', firstResult.image)
    cy.getByTestId('answer-wrap')
      .eq(0)
      .find('percent', { id: true })
      .should('contain.text', `${firstResult.percent}%`)
    cy.getByTestId('answer-wrap')
      .eq(0)
      .getByTestId('answer')
      .should('contain.text', firstResult.answer)

    cy.getByTestId('answer-wrap')
      .eq(1)
      .find('percent', { id: true })
      .should('contain.text', `${secondResult.percent}%`)
    cy.getByTestId('answer-wrap')
      .eq(1)
      .getByTestId('answer')
      .should('contain.text', secondResult.answer)
    cy.getByTestId('answer-wrap').eq(1).find('image', { id: true }).should('not.exist')
  })

  it('should go to SurveyList on back button click', () => {
    cy.visit('')
    survey.mockSuccessResultRequest()
    cy.visit('/surveys/any_id')
    cy.getByTestId('back-button').click()
    testUrl('/')
  })
})
