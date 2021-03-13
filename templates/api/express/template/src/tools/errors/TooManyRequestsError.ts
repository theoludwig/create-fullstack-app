import { CustomError } from './CustomError'
import { ErrorsMessageArray } from '../../typings/utils'

export class TooManyRequestsError extends CustomError {
  public statusCode = 429

  constructor () {
    super('Too Many Requests')
    Object.setPrototypeOf(this, TooManyRequestsError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    return [{ message: 'Too Many Requests' }]
  }
}
