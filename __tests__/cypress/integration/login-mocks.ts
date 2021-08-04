import { RequestHelpers } from '@/tests/cypress/helpers'

import faker from 'faker'

export const mockInvalidCredentialsRequest = (): void =>
  RequestHelpers.mockUnauthorizedRequest('POST', '/api/login')

export const mockUnexpectedErrorRequest = (): void =>
  RequestHelpers.mockServerErrorRequest('POST', '/api/login')

export const mockOkRequest = (): void => {
  cy.intercept('POST', '/api/login', {
    statusCode: 200,
    body: { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
  }).as('request')
}
