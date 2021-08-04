import { RequestHelpers } from '@/tests/cypress/helpers'

import faker from 'faker'

export const mockEmailInUseErrorRequest = (): void =>
  RequestHelpers.mockForbiddenRequest('POST', '/api/signup')

export const mockUnexpectedErrorRequest = (): void =>
  RequestHelpers.mockServerErrorRequest('POST', '/api/signup')

export const mockOkRequest = (): void => {
  cy.intercept('POST', '/api/signup', {
    statusCode: 200,
    body: { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
  }).as('request')
}
