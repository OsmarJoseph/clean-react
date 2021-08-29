import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteLoadSurveyResult } from '@/data/usecases'

import { HttpGetClientSpy, mockRemoteLoadSurveyResultClientModelList } from '@/tests/_data'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyResult.Client>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Client>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteLoadSurveyResult(mockUrl, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy,
    mockUrl,
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct url', async () => {
    const { sut, httpGetClientSpy, mockUrl } = makeSut()
    await sut.load()
    expect(httpGetClientSpy.params.url).toBe(mockUrl)
  })
  test('should throw UnexpectedError if HttpGetClient returns badRequest', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns unauthorized', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns forbidden', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new AccessDeniedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns notFound', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns serverError', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.load()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an SurveyModel list if HttpGetClient returns ok', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const surveyResult = mockRemoteLoadSurveyResultClientModelList()
    httpGetClientSpy.response.body = surveyResult
    const surveyListResult = await sut.load()
    expect(surveyListResult).toEqual({
      ...surveyResult,
      date: new Date(surveyResult.date),
    })
  })
})
