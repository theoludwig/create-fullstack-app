module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleDirectories: ['node_modules', './'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/.next/**',
    '!**/node_modules/**',
    '!**/next.config.js',
    '!**/postcss.config.js',
    '!**/tailwind.config.js',
    '!**/workbox-*.js',
    '!**/sw.js',
    '!**/jest.config.js'
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'cobertura']
}
