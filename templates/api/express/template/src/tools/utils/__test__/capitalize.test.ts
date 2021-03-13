import { capitalize } from '../capitalize'

test('/tools/utils/capitalize', () => {
  expect(capitalize('hello world')).toBe('Hello world')
  expect('Test').toBe('Test')
  expect('TEST').toBe('TEST')
})
