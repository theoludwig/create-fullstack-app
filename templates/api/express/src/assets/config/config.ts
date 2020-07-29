import { Dialect } from 'sequelize/types'

export const PORT = process.env.PORT ?? 8080
export const isProduction = process.env.NODE_ENV === 'production'
export const DATABASE = {
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
  dialect: 'mysql' as Dialect
}
