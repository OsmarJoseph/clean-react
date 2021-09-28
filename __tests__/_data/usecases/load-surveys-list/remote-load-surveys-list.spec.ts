import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteLoadSurveysList } from '@/data/usecases'

import { HttpClientSpy, mockRemoteLoadSurveysListClientModelList } from '@/tests/_data'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadSurveysList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveysList.Client>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveysList.Client>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteLoadSurveysList(mockUrl, httpClientSpy)

  return {
    sut,
    httpClientSpy,
    mockUrl,
  }
}

describe('RemoteLoadSurveysList', () => {
  test('should call HttpGetClient with correct url and method', async () => {
    const { sut, httpClientSpy, mockUrl } = makeSut()
    await sut.loadAll()
    expect(httpClientSpy.params.url).toBe(mockUrl)
    expect(httpClientSpy.params.method).toBe('get')
  })
  test('should throw UnexpectedError if HttpGetClient returns badRequest', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns unauthorized', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns forbidden', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new AccessDeniedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns notFound', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns serverError', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.loadAll()
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an empty list HttpGetClient returns noContent', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.noContent
    const responsePromise = sut.loadAll()
    await expect(responsePromise).resolves.toEqual([])
  })

  test('should return an SurveyModel list if HttpGetClient returns ok', async () => {
    const { sut, httpClientSpy } = makeSut()
    const surveyListExpected = mockRemoteLoadSurveysListClientModelList()
    httpClientSpy.response.body = surveyListExpected
    const surveyListResult = await sut.loadAll()
    expect(surveyListResult).toEqual([
      {
        id: surveyListExpected[0].id,
        question: surveyListExpected[0].question,
        answers: surveyListExpected[0].answers,
        date: new Date(surveyListExpected[0].date),
        didAnswer: surveyListExpected[0].didAnswer,
      },
      {
        id: surveyListExpected[1].id,
        question: surveyListExpected[1].question,
        answers: surveyListExpected[1].answers,
        date: new Date(surveyListExpected[1].date),
        didAnswer: surveyListExpected[1].didAnswer,
      },
    ])
  })
})
