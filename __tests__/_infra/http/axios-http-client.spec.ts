import { AxiosHttpClient } from '@/infra/http'

import { mockHttpRequest } from '@/tests/_data'
import { mockAxios, mockHttpResponse } from '@/tests/_infra'

import axios from 'axios'

jest.mock('axios')

type AxiosHttpClientConstructor = {
  request: { body: object }
  response: { body: object }
}

type SutTypes = {
  sut: AxiosHttpClient<AxiosHttpClientConstructor>
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient<AxiosHttpClientConstructor>()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios,
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const requestParams = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.request(requestParams)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: requestParams.url,
      data: requestParams.body,
      method: requestParams.method,
      headers: requestParams.headers,
    })
  })
  test('should return the correct statusCode and body on failure', async () => {
    const { sut, mockedAxios } = makeSut()

    const expectedResponse = mockHttpResponse()

    mockedAxios.request.mockClear().mockRejectedValueOnce({
      response: expectedResponse,
    })

    const httpResponse = await sut.request(mockHttpRequest())

    expect(httpResponse).toEqual({
      body: expectedResponse.data,
      statusCode: expectedResponse.status,
    })
  })
  test('should return the correct statusCode and body on success', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())

    const axiosPostResult = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      body: axiosPostResult.data,
      statusCode: axiosPostResult.status,
    })
  })
})
