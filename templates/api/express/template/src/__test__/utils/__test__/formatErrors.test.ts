import { formatErrors } from '../formatErrors'

test('__test__/utils/formatErrors', () => {
  expect(formatErrors('randomSring')).toEqual([])
  const errors = [
    { message: 'some error message' },
    { message: 'another error' }
  ]
  expect(formatErrors(errors)).toEqual(['some error message', 'another error'])
})
