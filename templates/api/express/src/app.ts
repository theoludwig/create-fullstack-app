import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import { redirectToHTTPS } from 'express-http-to-https'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

import { NotFoundError } from './utils/errors/NotFoundError'
import { errorHandler } from './middlewares/errorHandler'
import { PostsRouter } from './routes/posts'

const app = express()
dotenv.config()

app.use(helmet())
app.use(redirectToHTTPS([/localhost:(\d{4})/]))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/posts', PostsRouter)

app.use(() => {
  throw new NotFoundError()
})
app.use(errorHandler)

export default app
