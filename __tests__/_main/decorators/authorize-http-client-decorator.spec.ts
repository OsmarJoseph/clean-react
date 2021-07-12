import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

import { mockGetRequestParams, GetStorageMock, HttpGetClientSpy } from '@/tests/_data/mocks'

type Constructor = {
  response: { body: string }
}

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageMock: GetStorageMock
  httpGetClientSpy: HttpGetClientSpy<Constructor>
}

const makeSut = (): SutTypes => {
  const getStorageMock = new GetStorageMock()
  const httpGetClientSpy = new HttpGetClientSpy<Constructor>()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageMock, httpGetClientSpy)
  return { sut, getStorageMock, httpGetClientSpy }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', async () => {
    const { sut, getStorageMock } = makeSut()
    await sut.get(mockGetRequestParams())
    expect(getStorageMock.key).toBe('account')
  })
  test('should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const getRequestParams = mockGetRequestParams()

    await sut.get(getRequestParams)
    expect(httpGetClientSpy.params).toBe(getRequestParams)
  })
})
