import { AxiosHttpClient } from '@/infra/http'

import faker from 'faker'
import axios from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const mockRequestParams = (): {url: string, body: object} => ({
  url: faker.internet.url(),
  body: faker.random.objectElement<{}>({})
})

type AxiosHttpClientConstructor = {
  request: {body: object}
  response: {body: object}
}

type SutTypes = {
  sut: AxiosHttpClient<AxiosHttpClientConstructor>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient<AxiosHttpClientConstructor>()
  return {
    sut
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const requestParams = mockRequestParams()
    const { sut } = makeSut()

    await sut.post(requestParams)

    expect(mockedAxios.post).toHaveBeenCalledWith(requestParams.url, requestParams.body)
  })
  test('should return the correct statusCode and body', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.post(mockRequestParams())

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
