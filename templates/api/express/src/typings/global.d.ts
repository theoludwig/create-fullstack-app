import { Request, Response, NextFunction } from 'express'
import { Model, BuildOptions } from 'sequelize/types'

declare global {
  interface ResponseError extends Error {
    statusCode?: number
  }

  interface ErrorHandlerObject {
    statusCode: number
    message: string
  }

  interface RequestHandlerObject {
    req: Request
    res: Response
    next: NextFunction
  }

  // eslint-disable-next-line
  type SequelizeModelInstance = typeof Model & {
    // eslint-disable-next-line
    new (values?: object, options?: BuildOptions): Model
  }
}
