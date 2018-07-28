module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ["json", "html"],  
  roots: [
    "<rootDir>/server/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.tsx?$",
  modulePathIgnorePatterns: [
    "/__snapshots__/.*"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}