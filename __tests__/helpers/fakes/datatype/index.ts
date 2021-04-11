import faker from 'faker'

export const mockObject = (): object => ({
  [faker.random.word()]: faker.random.word()
})
