import { CustomError } from './CustomError'
import { ErrorsMessageArray } from '../../typings/utils'

export class NotFoundError extends CustomError {
  public statusCode = 404

  constructor () {
    super('Not Found')
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    return [{ message: 'Not Found' }]
  }
}
