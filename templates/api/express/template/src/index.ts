import app from './app'
import { sequelize } from './utils/database/sequelize'

const PORT = parseInt(process.env.PORT ?? '8080', 10)

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`)
    )
  })
  .catch(error => console.error(error))
