import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteAddAccount } from '@/data/usecases'

import { mockAccountModel, mockAddAccountParams } from '@/tests/_domain'
import { HttpClientSpy } from '@/tests/_data'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Client>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Client>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteAddAccount(mockUrl, httpClientSpy)

  return {
    sut,
    httpClientSpy,
    mockUrl,
  }
}

describe('RemoteAddAccount', () => {
  test('should call HttpPostClient with correct url', async () => {
    const { sut, httpClientSpy, mockUrl } = makeSut()
    await sut.add(mockAddAccountParams())
    expect(httpClientSpy.params.url).toBe(mockUrl)
    expect(httpClientSpy.params.method).toBe('post')
  })
  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    await sut.add(authenticationParams)
    expect(httpClientSpy.params.body).toEqual(authenticationParams)
  })
  test('should throw EmailInUseError if HttpPostClient returns unauthorized', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new EmailInUseError())
  })

  test('should throw UnexpectedError if HttpPostClient returns badRequest', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns notFound', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpPostClient returns serverError', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.add(authenticationParams)
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an AccountModel if HttpPostClient returns ok', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authenticationParams = mockAddAccountParams()
    const accountModel = mockAccountModel()
    httpClientSpy.response.body = accountModel
    const account = await sut.add(authenticationParams)
    expect(account).toEqual(accountModel)
  })
})
