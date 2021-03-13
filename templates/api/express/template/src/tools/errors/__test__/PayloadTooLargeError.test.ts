import { PayloadTooLargeError } from '../PayloadTooLargeError'

test('/tools/errors/PayloadTooLargeError', () => {
  const message = 'Payload Too Large'
  const empty = new PayloadTooLargeError()
  const custom = new PayloadTooLargeError(message)
  const emptySerializeErrors = empty.serializeErrors()
  const customSerializeErrors = custom.serializeErrors()
  expect(empty.statusCode).toEqual(413)
  expect(emptySerializeErrors.length).toEqual(1)
  expect(emptySerializeErrors[0].message).toEqual(
    'Payload Too Large: The request entity is larger than limits defined by server'
  )
  expect(custom.statusCode).toEqual(413)
  expect(customSerializeErrors.length).toEqual(1)
  expect(customSerializeErrors[0].message).toEqual(message)
})
