import { Dialect } from 'sequelize/types'

export const PORT = process.env.PORT || 8080
export const isProduction = process.env.NODE_ENV === 'production'
export const DATABASE = {
  host: process.env.DB_HOST!,
  name: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  dialect: 'mysql' as Dialect
}
