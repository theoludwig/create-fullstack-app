import { CustomError } from './CustomError'
import { ErrorsMessageArray } from '../../typings/utils'

export class BadRequestError extends CustomError {
  public statusCode = 400

  constructor (public message: string) {
    super(message)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    return [{ message: this.message }]
  }
}
