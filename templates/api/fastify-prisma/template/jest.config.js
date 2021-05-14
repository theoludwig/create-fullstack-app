module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./__test__/setup.ts'],
  rootDir: './src',
  collectCoverage: true,
  coverageDirectory: '../coverage/',
  coverageReporters: ['text', 'cobertura']
}
