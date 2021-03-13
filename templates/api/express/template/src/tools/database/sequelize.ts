import path from 'path'
import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  dialect: process.env.DATABASE_DIALECT,
  storage: process.env.DATABASE_DIALECT === 'sqlite' ? ':memory:' : undefined,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
  models: [path.join(__dirname, '..', '..', 'models')]
})

export { sequelize }
