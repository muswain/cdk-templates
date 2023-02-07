export default {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [],
  rootDir: 'packages',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testTimeout: 5000,
  verbose: true,
};
