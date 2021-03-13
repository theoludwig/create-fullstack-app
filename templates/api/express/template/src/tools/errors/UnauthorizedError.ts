import { CustomError } from './CustomError'

import { ErrorsMessageArray } from '../../typings/utils'

export class UnauthorizedError extends CustomError {
  public statusCode = 401

  constructor () {
    super('Unauthorized')
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    return [{ message: 'Unauthorized: Token is missing or invalid Bearer' }]
  }
}
