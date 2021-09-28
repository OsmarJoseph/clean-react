import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { accessTokenHeader, accountKey } from '@/constants'

import { mockAccountModel } from '@/tests/_domain'
import { mockHttpRequest, GetStorageSpy, HttpClientSpy } from '@/tests/_data'

type Constructor = {
  request: { headers: Record<string, string> }
  response: { body: string }
}

type SutTypes = {
  sut: AuthorizeHttpClientDecorator<Constructor>
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy<Constructor>
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy<Constructor>()
  const sut = new AuthorizeHttpClientDecorator<Constructor>(getStorageSpy, httpClientSpy)
  return { sut, getStorageSpy, httpClientSpy }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe(accountKey)
  })
  test('should not add headers if getStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest = mockHttpRequest()

    await sut.request(httpRequest)
    expect(httpClientSpy.params).toBe(httpRequest)
  })
  test('should add headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest = mockHttpRequest()

    await sut.request(httpRequest)
    expect(httpClientSpy.params.url).toBe(httpRequest.url)
    expect(httpClientSpy.params.method).toBe(httpRequest.method)
    expect(httpClientSpy.params.headers).toEqual({
      ...httpClientSpy.params.headers,
      [accessTokenHeader]: getStorageSpy.value.accessToken,
    })
  })
  test('should add headers to HttpGetClient if headers is not defined', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest = mockHttpRequest()
    Reflect.deleteProperty(httpRequest, 'headers')

    await sut.request(httpRequest)
    expect(httpClientSpy.params.url).toBe(httpRequest.url)
    expect(httpClientSpy.params.headers).toEqual({
      ...httpClientSpy.params.headers,
      [accessTokenHeader]: getStorageSpy.value.accessToken,
    })
  })
  test('should add return the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const response = await sut.request(mockHttpRequest())
    expect(response).toBe(httpClientSpy.response)
  })
})
