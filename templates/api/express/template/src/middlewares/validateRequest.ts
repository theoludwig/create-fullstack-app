import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'

import { RequestValidationError } from '../utils/errors/RequestValidationError'

export const validateRequest: RequestHandler = (req, _res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  next()
}
