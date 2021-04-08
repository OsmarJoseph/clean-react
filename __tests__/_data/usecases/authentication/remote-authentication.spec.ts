import { InvalidCredentialsError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { AuthenticationHttpPostClient, RemoteAuthentication } from '@/data/usecases'

import { mockAuthenticationParams } from '@/__tests__/_domain/mocks'
import { HttpPostClientSpy } from '@/__tests__/_data/mocks'

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
})
