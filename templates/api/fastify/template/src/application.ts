import dotenv from 'dotenv'
import fastify from 'fastify'
import fastifySocketIo from './tools/plugins/socket-io'
import fastifyCors from 'fastify-cors'
import fastifySwagger from 'fastify-swagger'
import fastifyUrlData from 'fastify-url-data'
import fastifyHelmet from 'fastify-helmet'
import fastifyRateLimit from 'fastify-rate-limit'
import fastifySensible from 'fastify-sensible'

import { services } from './services'
import { swaggerOptions } from './tools/config/swaggerOptions'

export const application = fastify({
  logger: process.env.NODE_ENV === 'development'
})
dotenv.config()

const main = async (): Promise<void> => {
  await application.register(fastifyCors)
  await application.register(fastifySensible)
  await application.register(fastifyUrlData)
  await application.register(fastifySocketIo, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
  })
  await application.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
        scriptSrc: ["'self'", "https: 'unsafe-inline'"]
      }
    }
  })
  await application.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute'
  })
  await application.register(fastifySwagger, swaggerOptions)
  await application.register(services)
}

main().catch(() => {})
