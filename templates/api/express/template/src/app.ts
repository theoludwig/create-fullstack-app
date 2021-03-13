import 'express-async-errors'

import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request } from 'express'
import { redirectToHTTPS } from 'express-http-to-https'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'

import { errorHandler } from './tools/middlewares/errorHandler'
import { router } from './services'
import { NotFoundError } from './tools/errors/NotFoundError'
import { TooManyRequestsError } from './tools/errors/TooManyRequestsError'

const app = express()
dotenv.config()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan<Request>('dev'))
} else if (process.env.NODE_ENV === 'production') {
  app.use(redirectToHTTPS())
  const requestPerSecond = 2
  const seconds = 60
  const windowMs = seconds * 1000
  app.enable('trust proxy')
  app.use(
    rateLimit({
      windowMs,
      max: seconds * requestPerSecond,
      handler: () => {
        throw new TooManyRequestsError()
      }
    })
  )
}

app.use(express.json())
app.use(helmet())
app.use(cors<Request>())
app.use(router)
app.use(() => {
  throw new NotFoundError()
})
app.use(errorHandler)

export default app
