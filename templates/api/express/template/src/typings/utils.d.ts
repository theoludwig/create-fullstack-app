import { Model, BuildOptions } from 'sequelize/types'

export type ErrorsMessageArray = Array<{ message: string, field?: string }>

export interface ObjectAny {
  [key: string]: any
}

export type SequelizeModelInstance = typeof Model &
  (new (values?: object, options?: BuildOptions) => Model)
