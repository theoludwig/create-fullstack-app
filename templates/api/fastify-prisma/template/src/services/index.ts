import { FastifyPluginAsync } from 'fastify'

import { helloService } from './hello'
import { postsService } from './posts'

export const services: FastifyPluginAsync = async (fastify) => {
  await fastify.register(helloService)
  await fastify.register(postsService)
}
