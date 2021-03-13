import { ValidationError } from 'express-validator'

import { CustomError } from './CustomError'
import { ErrorsMessageArray } from '../../typings/utils'

export class RequestValidationError extends CustomError {
  public statusCode = 400

  constructor (public errors: ValidationError[]) {
    super('Invalid request')
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    return this.errors.map(error => {
      return {
        message: error.msg,
        field: error.param
      }
    })
  }
}
