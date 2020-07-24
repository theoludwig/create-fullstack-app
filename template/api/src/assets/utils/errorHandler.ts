import { NextFunction } from 'express'

function errorHandler (
  next: NextFunction,
  { statusCode, message }: ErrorHandlerObject
) {
  const error: ResponseError = new Error(message)
  error.statusCode = statusCode
  return next(error)
}

export default errorHandler
