import { Request, Response, NextFunction } from 'express'
import { Model, BuildOptions } from 'sequelize/types'

export type ErrorsMessageArray = Array<{ message: string, field?: string }>

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DATABASE_HOST: string
      DATABASE_NAME: string
      DATABASE_USER: string
      DATABASE_PASSWORD: string
      DATABASE_PORT: string
    }
  }

  interface RequestHandlerObject {
    req: Request
    res: Response
    next: NextFunction
  }

  type SequelizeModelInstance = typeof Model & (new (values?: object, options?: BuildOptions) => Model)
}
