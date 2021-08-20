import { mockServerErrorRequest, mockForbiddenRequest } from '@/tests/cypress'

import faker from 'faker'

const path = '/api/signup'

export const mockEmailInUseErrorRequest = (): void => mockForbiddenRequest('POST', path)

export const mockUnexpectedErrorRequest = (): void => mockServerErrorRequest('POST', path)

export const mockSuccessRequest = (): void => {
  cy.intercept('POST', path, {
    statusCode: 200,
    body: { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
  }).as('request')
}
