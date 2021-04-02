import { FastifyPluginAsync } from 'fastify'

import { getHello } from './get'

export const helloService: FastifyPluginAsync = async (fastify) => {
  await fastify.register(getHello)
}
