import faker from 'faker'

export const mockObject = (): Record<string, string> => ({
  [faker.random.word()]: faker.random.word(),
})
