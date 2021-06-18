import { RequestsHelper } from '@/tests/cypress/helpers'

import faker from 'faker'

export const mockInvalidCredentialsRequest = (): void => {
  RequestsHelper.mockInvalidRequest('POST', '/api/login')
}

export const mockUnexpectedErrorRequest = (): void => {
  RequestsHelper.mockUnexpectedErrorRequest('POST', '/api/login')
}

export const mockOkRequest = (): void => {
  cy.intercept('POST', '/api/login', {
    statusCode: 200,
    body: { accessToken: faker.datatype.uuid() },
  }).as('request')
}
