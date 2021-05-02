import { AxiosHttpClient } from '@/infra/http'

import { mockRequestParams } from '@/__tests__/_data/mocks'
import { mockAxios } from '@/__tests__/_infra/mocks'

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
    const requestParams = mockRequestParams()
    const { sut, mockedAxios } = makeSut()

    await sut.post(requestParams)

    expect(mockedAxios.post).toHaveBeenCalledWith(requestParams.url, requestParams.body)
  })
  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.post(mockRequestParams())

    const axiosPostResult = await mockedAxios.post.mock.results[0].value

    expect(httpResponse).toEqual({
      body: axiosPostResult.data,
      statusCode: axiosPostResult.status,
    })
  })
})
