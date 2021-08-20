import { mockOkRequest, mockServerErrorRequest, mockUnauthorizedRequest } from '@/tests/cypress'
import { mockAccountModel } from '@/tests/_domain'

const path = '/api/login'

export const mockInvalidCredentialsRequest = (): void => mockUnauthorizedRequest('POST', path)

export const mockUnexpectedErrorRequest = (): void => mockServerErrorRequest('POST', path)

export const mockSuccessRequest = (): void => mockOkRequest('POST', path, mockAccountModel())
