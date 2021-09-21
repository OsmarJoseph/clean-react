import { UnexpectedError } from '@/domain/errors'

import { survey, mockAccountStorage, testUrl, getAccountStorage } from '@/tests/cypress'
import { mockSurveyList } from '@/tests/_domain'

describe('SurveyList', () => {
  beforeEach(() => {
    mockAccountStorage()
  })
  it('should present error on UnexpectedError', () => {
    survey.mockUnexpectedError()
    cy.visit('/')

    cy.getByTestId('error').should('contain.text', UnexpectedError.message)
  })
  it('should reload on button click', () => {
    survey.mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('error').should('contain.text', UnexpectedError.message)
    survey.mockSuccessListRequest()
    cy.getByTestId('reload').click()
    cy.getByTestId('survey-item').should('have.length', mockSurveyList().length)
  })
  it('should logout on AccessDeniedError', () => {
    survey.mockAccessDeniedError()
    cy.visit('/')

    testUrl('/login')
  })
  it('should presente correct user name', () => {
    survey.mockUnexpectedError()
    cy.visit('/')

    const { name } = getAccountStorage()

    cy.getByTestId('username').should('contain.text', name)
  })
  it('should logout on logout link click', () => {
    survey.mockSuccessListRequest()
    cy.visit('/')

    cy.getByTestId('logout').click()
    testUrl('/login')
  })

  it('should present survey items', () => {
    const surveys = mockSurveyList()
    const [firstSurvey, secondSurvey] = surveys
    firstSurvey.didAnswer = false
    firstSurvey.date = new Date('2018-02-03T00:00:00')

    secondSurvey.didAnswer = true
    secondSurvey.date = new Date('2020-10-20T00:00:00')
    survey.mockSuccessListRequest(surveys)

    cy.visit('/')

    cy.getByTestId('empty-survey-item', ':empty').should('have.length', 4)
    cy.getByTestId('survey-item').should('have.length', surveys.length)
    cy.fixture('icons').then((icon) => {
      cy.getByTestId('survey-item').eq(0).find('day', { id: true }).should('contain.text', '03')
      cy.getByTestId('survey-item').eq(0).find('month', { id: true }).should('contain.text', 'fev')
      cy.getByTestId('survey-item').eq(0).find('year', { id: true }).should('contain.text', '2018')
      cy.getByTestId('survey-item')
        .eq(0)
        .find('icon', { id: true })
        .should('have.attr', 'src', icon.thumbDown.base64)
      cy.getByTestId('survey-item')
        .eq(0)
        .find('question', { id: true })
        .should('contain.text', firstSurvey.question)

      cy.getByTestId('survey-item').eq(1).find('day', { id: true }).should('contain.text', '20')
      cy.getByTestId('survey-item').eq(1).find('month', { id: true }).should('contain.text', 'out')
      cy.getByTestId('survey-item').eq(1).find('year', { id: true }).should('contain.text', '2020')
      cy.getByTestId('survey-item')
        .eq(1)
        .find('question', { id: true })
        .should('contain.text', secondSurvey.question)
      cy.getByTestId('survey-item')
        .eq(1)
        .find('icon', { id: true })
        .should('have.attr', 'src', icon.thumbUp.base64)
    })
  })
})
