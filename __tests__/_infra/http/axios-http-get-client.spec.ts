import { AxiosHttpPostClient } from '@/infra/http'

import { mockPostRequestParams } from '@/tests/_data/mocks'
import { mockAxios, mockHttpResponse } from '@/tests/_infra/mocks'

import axios from 'axios'

jest.mock('axios')

type AxiosHttpPostClientConstructor = {
  request: { body: object }
  response: { body: object }
}

type SutTypes = {
  sut: AxiosHttpPostClient<AxiosHttpPostClientConstructor>
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpPostClient<AxiosHttpPostClientConstructor>()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios,
  }
}

describe('AxiosHttpPostClient', () => {
  describe('post', () => {
    test('should call axios with correct values', async () => {
      const requestParams = mockPostRequestParams()
      const { sut, mockedAxios } = makeSut()

      await sut.post(requestParams)

      expect(mockedAxios.post).toHaveBeenCalledWith(requestParams.url, requestParams.body)
    })
    test('should return the correct statusCode and body on failure', async () => {
      const { sut, mockedAxios } = makeSut()

      const expectedResponse = mockHttpResponse()

      mockedAxios.post.mockClear().mockRejectedValueOnce({
        response: expectedResponse,
      })

      const httpResponse = await sut.post(mockPostRequestParams())

      expect(httpResponse).toEqual({
        body: expectedResponse.data,
        statusCode: expectedResponse.status,
      })
    })
    test('should return the correct statusCode and body on success', async () => {
      const { sut, mockedAxios } = makeSut()

      const httpResponse = await sut.post(mockPostRequestParams())

      const axiosPostResult = await mockedAxios.post.mock.results[0].value

      expect(httpResponse).toEqual({
        body: axiosPostResult.data,
        statusCode: axiosPostResult.status,
      })
    })
  })
})
