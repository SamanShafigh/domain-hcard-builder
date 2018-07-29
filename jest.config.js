module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  roots: [
    '<rootDir>/server/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.tsx?$',
  modulePathIgnorePatterns: [
    '/__snapshots__/.*',
    '/mock/index.ts',
    '/*.mock.js',
    'type.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 60,
      statements: 60,
    },
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};
