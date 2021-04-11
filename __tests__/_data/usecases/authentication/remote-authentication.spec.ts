import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { AuthenticationHttpPostClient, RemoteAuthentication } from '@/data/usecases'

import { mockAccountModel, mockAuthenticationParams } from '@/__tests__/_domain/fakes'
import { HttpPostClientSpy } from '@/__tests__/_data/fakes'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationHttpPostClient>
  mockUrl: string

}

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationHttpPostClient>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteAuthentication(mockUrl, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
    mockUrl
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    const { sut, httpPostClientSpy, mockUrl } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(httpPostClientSpy.params.url).toBe(mockUrl)
  })
  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.params.body).toEqual(authenticationParams)
  })
  test('should throw InvalidCredentialsError if HttpPostClient returns unauthorized', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpPostClient returns badRequest', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns notFound', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns serverError', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.auth(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an AccountModel if HttpPostClient returns ok', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    const accountModel = mockAccountModel()
    httpPostClientSpy.response.body = accountModel
    const account = await sut.auth(authenticationParams)
    expect(account).toEqual(accountModel)
  })
})
