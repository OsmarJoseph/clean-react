import { AxiosHttpGetClient } from '@/infra/http'

import { mockGetRequestParams } from '@/tests/_data/mocks'
import { mockAxios, mockHttpResponse } from '@/tests/_infra/mocks'

import axios from 'axios'

jest.mock('axios')

type AxiosHttpGetClientConstructor = {
  response: { body: object }
}

type SutTypes = {
  sut: AxiosHttpGetClient<AxiosHttpGetClientConstructor>
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpGetClient<AxiosHttpGetClientConstructor>()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios,
  }
}

describe('AxiosHttpGetClient', () => {
  describe('get', () => {
    test('should call axios with correct values', async () => {
      const requestParams = mockGetRequestParams()
      const { sut, mockedAxios } = makeSut()

      await sut.get(requestParams)

      expect(mockedAxios.get).toHaveBeenCalledWith(requestParams.url)
    })

    test('should return the correct statusCode and body on failure', async () => {
      const { sut, mockedAxios } = makeSut()

      const expectedResponse = mockHttpResponse()

      mockedAxios.get.mockClear().mockRejectedValueOnce({
        response: expectedResponse,
      })

      const httpResponse = await sut.get(mockGetRequestParams())

      expect(httpResponse).toEqual({
        body: expectedResponse.data,
        statusCode: expectedResponse.status,
      })
    })
    test('should return the correct statusCode and body on success', async () => {
      const { sut, mockedAxios } = makeSut()

      const httpResponse = await sut.get(mockGetRequestParams())

      const axiosGetResult = await mockedAxios.get.mock.results[0].value

      expect(httpResponse).toEqual({
        body: axiosGetResult.data,
        statusCode: axiosGetResult.status,
      })
    })
  })
})
