import dotenv from 'dotenv'

import { SwaggerOptions } from 'fastify-swagger'
import { PORT } from '.'

dotenv.config()

export const swaggerOptions: SwaggerOptions = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'api-fastify',
      description: 'REST API made with `fastify`.',
      version: process.env.npm_package_version ?? '1.0.0'
    },
    host: `localhost:${PORT}`,
    basePath: '/',
    tags: [{ name: 'posts' }]
  },
  exposeRoute: true
}
