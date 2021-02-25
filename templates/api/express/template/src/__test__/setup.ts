import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'
import { Sequelize } from 'sequelize-typescript'

let sqlite: Database | undefined
let sequelize: Sequelize | undefined
beforeAll(async () => {
  sqlite = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  })
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    models: [path.join(__dirname, '..', 'models')]
  })
})

beforeEach(async () => {
  await sequelize?.sync({ force: true })
})

afterAll(async () => {
  await sqlite?.close()
  await sequelize?.close()
})
