import type { Config } from '@jest/types'

const config: Config.InitialOptions = {

  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/*.d.ts'
  ],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/__tests__/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}

export default config