import dotenv from 'dotenv'

import { SwaggerOptions } from 'fastify-swagger'

dotenv.config()

export const swaggerOptions: SwaggerOptions = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'api-fastify',
      description: 'REST API made with `fastify`.',
      version: process.env.npm_package_version
    },
    host: `localhost:${process.env.PORT}`,
    basePath: '/',
    tags: [{ name: 'posts' }]
  },
  exposeRoute: true
}
