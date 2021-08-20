import { UnexpectedError } from '@/domain/errors'

import { surveyList, mockAccountStorage, testUrl, getAccountStorage } from '@/tests/cypress'
import { mockSurveyList } from '@/tests/_domain'

describe('SurveyList', () => {
  beforeEach(() => {
    mockAccountStorage()
  })
  it('should present error on UnexpectedError', () => {
    surveyList.mockUnexpectedError()
    cy.visit('/')

    cy.getByTestId('error').should('contain.text', UnexpectedError.message)
  })
  it('should reload on button click', () => {
    surveyList.mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('error').should('contain.text', UnexpectedError.message)
    surveyList.mockSuccessRequest()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', mockSurveyList().length)
  })
  it('should logout on AccessDeniedError', () => {
    surveyList.mockAccessDeniedError()
    cy.visit('/')

    testUrl('/login')
  })
  it('should presente correct user name', () => {
    surveyList.mockUnexpectedError()
    cy.visit('/')

    const { name } = getAccountStorage()

    cy.getByTestId('username').should('contain.text', name)
  })
  it('should logout on logout link click', () => {
    surveyList.mockSuccessRequest()
    cy.visit('/')

    cy.getByTestId('logout').click()
    testUrl('/login')
  })

  it('should present survey items', () => {
    const surveys = mockSurveyList()
    const [firstSurvey, secondSurvey] = surveys
    firstSurvey.didAnswer = false
    firstSurvey.date = new Date('2018-02-03T00:00:00')
    surveyList.mockSuccessRequest(surveys)

    secondSurvey.didAnswer = true
    secondSurvey.date = new Date('2020-10-20T00:00:00')
    surveyList.mockSuccessRequest(surveys)

    cy.visit('/')

    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', surveys.length)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(li.find('[data-testid="question"]').text(), firstSurvey.question)
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown.base64)
      })
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '20')
      assert.equal(li.find('[data-testid="month"]').text(), 'out')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), secondSurvey.question)
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp.base64)
      })
    })
  })
})
