import path from 'path'
import { Sequelize } from 'sequelize-typescript'

import { DATABASE } from '../config/config'

const sequelize: Sequelize = new Sequelize({
  database: DATABASE.name,
  dialect: DATABASE.dialect,
  username: DATABASE.user,
  password: DATABASE.password,
  port: DATABASE.port,
  models: [path.join(__dirname, '..', '..', 'models')]
})

export default sequelize
