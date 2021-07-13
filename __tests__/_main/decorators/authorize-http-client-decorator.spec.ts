import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

import { mockAccountModel } from '@/tests/_domain/mocks'
import { mockGetRequestParams, GetStorageSpy, HttpGetClientSpy } from '@/tests/_data/mocks'

type Constructor = {
  response: { body: string }
}

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy<Constructor>
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy<Constructor>()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
  return { sut, getStorageSpy, httpGetClientSpy }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequestParams())
    expect(getStorageSpy.key).toBe('account')
  })
  test('should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const getRequestParams = mockGetRequestParams()

    await sut.get(getRequestParams)
    expect(httpGetClientSpy.params).toBe(getRequestParams)
  })
  test('should add headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const getRequestParams = mockGetRequestParams()

    await sut.get(getRequestParams)
    expect(httpGetClientSpy.params.url).toBe(getRequestParams.url)
    expect(httpGetClientSpy.params.headers).toEqual({
      ...httpGetClientSpy.params.headers,
      'x-access-token': getStorageSpy.value.accessToken,
    })
  })
  test('should add headers to HttpGetClient if headers is not defined', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const getRequestParams = mockGetRequestParams()
    Reflect.deleteProperty(getRequestParams, 'headers')

    await sut.get(getRequestParams)
    expect(httpGetClientSpy.params.url).toBe(getRequestParams.url)
    expect(httpGetClientSpy.params.headers).toEqual({
      ...httpGetClientSpy.params.headers,
      'x-access-token': getStorageSpy.value.accessToken,
    })
  })
  test('should add return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const response = await sut.get(mockGetRequestParams())
    expect(response).toBe(httpGetClientSpy.response)
  })
})
