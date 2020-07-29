/* Modules */
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import { redirectToHTTPS } from 'express-http-to-https'
import morgan from 'morgan'
import cors from 'cors'

import sequelize from './assets/utils/sequelize'
import { PORT } from './assets/config/config'
import { get404, get500 } from './controllers/errors'
import routesPosts from './routes/posts'

/* Variables */
dotenv.config()
const app = express()

/* Middlewares */
app.use(helmet())
app.use(redirectToHTTPS([/localhost:(\d{4})/]))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

/* Routes */
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/posts', routesPosts)

/* Errors Handling */
app.use(get404)
app.use(get500)

/* Server */
// sequelize.sync({ force: true })
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`)
    )
  })
  .catch(error => console.error(error))
