import { CustomError } from './CustomError'
import { ErrorsMessageArray } from '../../typings/utils'

export class PayloadTooLargeError extends CustomError {
  public statusCode = 413

  constructor (public customMessage?: string) {
    super('Payload Too Large')
    Object.setPrototypeOf(this, PayloadTooLargeError.prototype)
  }

  serializeErrors (): ErrorsMessageArray {
    if (this.customMessage == null) {
      return [
        {
          message: 'Payload Too Large: The request entity is larger than limits defined by server'
        }
      ]
    }

    return [{ message: this.customMessage }]
  }
}
