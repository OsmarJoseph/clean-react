import { mockObject } from '@/tests/helpers'

import faker from 'faker'
import axios from 'axios'

export const mockHttpResponse = (): { data: unknown; status: number } => ({
  data: mockObject(),
  status: faker.datatype.number(),
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
