import { ErrorRequestHandler } from 'express'

import { CustomError } from '../errors/CustomError'

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _req,
  res,
  _next
) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      errors: error.serializeErrors()
    })
  }

  return res.status(500).json({
    errors: [{ message: 'Internal server error' }]
  })
}
