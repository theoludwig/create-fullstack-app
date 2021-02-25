import { CustomError } from './CustomError'
import { ErrorsMessageArray } from '../../typings'

export class NotFoundError extends CustomError {
  public statusCode = 404

  constructor () {
    super('Route not Found')
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    return [{ message: 'Not Found' }]
  }
}
