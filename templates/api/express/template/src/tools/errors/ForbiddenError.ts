import { CustomError } from './CustomError'
import { ErrorsMessageArray } from '../../typings/utils'

export class ForbiddenError extends CustomError {
  public statusCode = 403

  constructor () {
    super('Forbidden')
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    return [{ message: 'Forbidden' }]
  }
}
