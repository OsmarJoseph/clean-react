import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteSaveSurveyResult } from '@/data/usecases'

import { mockSaveSurveyResultParams } from '@/tests/_domain'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/tests/_data'

import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<RemoteSaveSurveyResult.Client>
  mockUrl: string
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Client>()

  const mockUrl = faker.internet.url()
  const sut = new RemoteSaveSurveyResult(mockUrl, httpClientSpy)

  return {
    sut,
    httpClientSpy,
    mockUrl,
  }
}

describe('RemoteSaveSurveyResult', () => {
  test('should call HttpGetClient with correct values', async () => {
    const { sut, httpClientSpy, mockUrl } = makeSut()
    const saveAccountParams = mockSaveSurveyResultParams()
    await sut.save(saveAccountParams)
    expect(httpClientSpy.params.url).toBe(mockUrl)
    expect(httpClientSpy.params.method).toBe('put')
    expect(httpClientSpy.params.body).toEqual(saveAccountParams)
  })
  test('should throw UnexpectedError if HttpGetClient returns badRequest', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.badRequest
    const responsePromise = sut.save(mockSaveSurveyResultParams())
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns unauthorized', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const responsePromise = sut.save(mockSaveSurveyResultParams())
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns forbidden', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.forbidden
    const responsePromise = sut.save(mockSaveSurveyResultParams())
    await expect(responsePromise).rejects.toThrow(new AccessDeniedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns notFound', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.notFound
    const responsePromise = sut.save(mockSaveSurveyResultParams())
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpGetClient returns serverError', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError
    const responsePromise = sut.save(mockSaveSurveyResultParams())
    await expect(responsePromise).rejects.toThrow(new UnexpectedError())
  })
  test('should return a SurveyModel list if HttpGetClient returns ok', async () => {
    const { sut, httpClientSpy } = makeSut()
    const surveyResult = mockRemoteSurveyResultModel()
    httpClientSpy.response.body = surveyResult
    const surveyListResult = await sut.save(mockSaveSurveyResultParams())
    expect(surveyListResult).toEqual({
      ...surveyResult,
      date: new Date(surveyResult.date),
    })
  })
})
