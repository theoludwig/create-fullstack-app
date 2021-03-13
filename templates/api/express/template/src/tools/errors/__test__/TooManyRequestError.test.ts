import { TooManyRequestsError } from '../TooManyRequestsError'

test('/tools/errors/TooManyRequestsError', () => {
  const tooManyRequestError = new TooManyRequestsError()
  const errors = tooManyRequestError.serializeErrors()
  expect(tooManyRequestError.statusCode).toEqual(429)
  expect(errors.length).toEqual(1)
  expect(errors[0].message).toEqual('Too Many Requests')
})
