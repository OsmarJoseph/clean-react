import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { LoadSurveysListHttpGetClient, RemoteLoadSurveysList } from '@/data/usecases'

import { HttpGetClientSpy } from '@/tests/_data/mocks'
import { mockSurveyList } from '@/tests/_domain/mocks'

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
  test('should throw UnexpectedError if HttpGetClient returns badRequest', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns unauthorized', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns forbidden', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns notFound', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns serverError', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an empty list HttpGetClient returns noContent', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.noContent
    const responsePromise = sut.loadAll()
    await expect(responsePromise).resolves.toEqual([])
  })

  test('should return an SurveyModel list if HttpGetClient returns ok', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const surveyListExpected = mockSurveyList()
    httpGetClientSpy.response.body = surveyListExpected
    const surveyListResult = await sut.loadAll()
    expect(surveyListResult).toEqual(surveyListExpected)
  })
})
