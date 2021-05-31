import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { AuthenticationHttpPostClient, RemoteAddAccount } from '@/data/usecases'

import { mockAccountModel, mockAddAccountParams } from '@/tests/_domain/mocks'
import { HttpPostClientSpy } from '@/tests/_data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AuthenticationHttpPostClient>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationHttpPostClient>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteAddAccount(mockUrl, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
    mockUrl,
  }
}

describe('RemoteAddAccount', () => {
  test('should call HttpPostClient with correct url', async () => {
    const { sut, httpPostClientSpy, mockUrl } = makeSut()
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.params.url).toBe(mockUrl)
  })
  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    await sut.add(authenticationParams)
    expect(httpPostClientSpy.params.body).toEqual(authenticationParams)
  })
  test('should throw EmailInUseError if HttpPostClient returns unauthorized', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new EmailInUseError())
  })

  test('should throw UnexpectedError if HttpPostClient returns badRequest', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns notFound', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns serverError', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpPostClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an AccountModel if HttpPostClient returns ok', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    const accountModel = mockAccountModel()
    httpPostClientSpy.response.body = accountModel
    const account = await sut.add(authenticationParams)
    expect(account).toEqual(accountModel)
  })
})
