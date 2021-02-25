import { ErrorRequestHandler } from 'express'

import { CustomError } from '../utils/errors/CustomError'

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _req,
  res,
  _next
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      errors: error.serializeErrors()
    })
  }

  return res.status(500).json({
    errors: [{ message: 'Internal server error' }]
  })
}
