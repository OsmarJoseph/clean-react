import { RequestsHelper } from '@/tests/cypress/helpers'

import faker from 'faker'

export const mockEmailInUseErrorRequest = (): void =>
  RequestsHelper.mockEmailInUseErrorRequest('POST', '/api/signup')

export const mockUnexpectedErrorRequest = (): void =>
  RequestsHelper.mockUnexpectedErrorRequest('POST', '/api/signup')

export const mockInvalidDataRequest = (): void =>
  RequestsHelper.mockInvalidDataRequest('POST', '/api/signup')

export const mockOkRequest = (): void => {
  cy.intercept('POST', '/api/signup', {
    statusCode: 200,
    body: { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
  }).as('request')
}
