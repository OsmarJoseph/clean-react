module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/__tests__/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
