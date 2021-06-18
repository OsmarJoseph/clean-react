import { LoadSurveysListHttpGetClient, RemoteLoadSurveysList } from '@/data/usecases'

import { HttpGetClientSpy } from '@/tests/_data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadSurveysList
  httpGetClientSpy: HttpGetClientSpy<LoadSurveysListHttpGetClient>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<LoadSurveysListHttpGetClient>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteLoadSurveysList(mockUrl, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy,
    mockUrl,
  }
}

describe('RemoteLoadSurveysList', () => {
  test('should call HttpGetClient with correct url', async () => {
    const { sut, httpGetClientSpy, mockUrl } = makeSut()
    await sut.loadAll()
    expect(httpGetClientSpy.params.url).toBe(mockUrl)
  })
})
