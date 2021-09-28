import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteAuthentication } from '@/data/usecases'

import { mockAccountModel, mockAuthenticationParams } from '@/tests/_domain'
import { HttpClientSpy } from '@/tests/_data'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Client>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Client>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteAuthentication(mockUrl, httpClientSpy)

  return {
    sut,
    httpClientSpy,
    mockUrl,
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    const { sut, httpClientSpy, mockUrl } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(httpClientSpy.params.url).toBe(mockUrl)
    expect(httpClientSpy.params.method).toBe('post')
  })
  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(httpClientSpy.params.body).toEqual(authenticationParams)
  })
  test('should throw InvalidCredentialsError if HttpPostClient returns unauthorized', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpPostClient returns badRequest', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns forbidden', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns notFound', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns serverError', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an AccountModel if HttpPostClient returns ok', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    const accountModel = mockAccountModel()
    httpClientSpy.response.body = accountModel
    const account = await sut.auth(authenticationParams)
    expect(account).toEqual(accountModel)
  })
})
