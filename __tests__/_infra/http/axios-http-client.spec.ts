import { AxiosHttpClient } from '@/infra/http'

import faker from 'faker'
import axios from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

type AxiosHttpClientConstructor = {
  request: {body: string}
  response: {body: string}
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
    const requestParams = {
      url: faker.internet.url(),
      body: faker.random.objectElement()
    }
    const { sut } = makeSut()

    await sut.post(requestParams)

    expect(mockedAxios.post).toHaveBeenCalledWith(requestParams.url, requestParams.body)
  })
})
