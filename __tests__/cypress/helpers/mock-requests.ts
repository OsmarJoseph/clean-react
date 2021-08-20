import { RouteMatcher } from 'cypress/types/net-stubbing'

import faker from 'faker'

export const mockUnauthorizedRequest = (method: 'POST' | 'GET', url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: 401,
    response: { error: faker.random.words() },
  })
}

export const mockServerErrorRequest = (method: 'POST' | 'GET', url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.randomize([400, 404, 500]),
    response: { error: faker.random.words() },
  })
}

export const mockOkRequest = (
  method: 'POST' | 'GET',
  url: RouteMatcher,
  response: unknown,
): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response,
  }).as('request')
}

export const mockInvalidDataRequest = (method: 'POST' | 'GET', url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: { invalidProperty: faker.datatype.uuid() },
  })
}

export const mockForbiddenRequest = (method: 'POST' | 'GET', url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: 403,
    response: { error: faker.random.words() },
  })
}
