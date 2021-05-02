import { mockObject } from '@/__tests__/helpers/fakes'

import faker from 'faker'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockClear().mockResolvedValue({
    data: mockObject(),
    status: faker.datatype.number(),
  })

  return mockedAxios
}
