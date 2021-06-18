import { RouteMatcher } from 'cypress/types/net-stubbing'

import faker from 'faker'

export const mockInvalidRequest = (method: 'POST' | 'GET', url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: 401,
    response: { error: faker.random.words() },
  })
}

export const mockUnexpectedErrorRequest = (method: 'POST' | 'GET', url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.randomize([400, 404, 500]),
    response: { error: faker.random.words() },
  })
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

const baseUrl: string = Cypress.config().baseUrl
export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}
