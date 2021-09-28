import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteLoadSurveyResult } from '@/data/usecases'

import { HttpClientSpy, mockRemoteLoadSurveyResultClientModelList } from '@/tests/_data'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyResult.Client>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyResult.Client>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteLoadSurveyResult(mockUrl, httpClientSpy)

  return {
    sut,
    httpClientSpy,
    mockUrl,
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct url', async () => {
    const { sut, httpClientSpy, mockUrl } = makeSut()
    await sut.load()
    expect(httpClientSpy.params.url).toBe(mockUrl)
    expect(httpClientSpy.params.method).toBe('get')
  })
  test('should throw UnexpectedError if HttpGetClient returns badRequest', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns unauthorized', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns forbidden', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new AccessDeniedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns notFound', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns serverError', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an SurveyModel list if HttpGetClient returns ok', async () => {
    const { sut, httpClientSpy } = makeSut()
    const surveyResult = mockRemoteLoadSurveyResultClientModelList()
    httpClientSpy.response.body = surveyResult
    const surveyListResult = await sut.load()
    expect(surveyListResult).toEqual({
      ...surveyResult,
      date: new Date(surveyResult.date),
    })
  })
})
