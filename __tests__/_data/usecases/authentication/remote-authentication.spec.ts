import { RemoteAuthentication } from '@/data/usecases'
import { HttpPostClientSpy } from '@/__tests__/_data/mocks'
import { mockAuthenticationParams } from '@/__tests__/_domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
  mockUrl: string

}

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
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
})
