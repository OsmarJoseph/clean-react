import { testUrl } from '@/tests/cypress'

describe('Login', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('/')
    testUrl('/login')
  })
})
