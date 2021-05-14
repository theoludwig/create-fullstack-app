import { FastifyPluginAsync } from 'fastify'

import { deletePostById } from './delete'
import { putPostById } from './put'

export const postsByIdService: FastifyPluginAsync = async (fastify) => {
  await fastify.register(deletePostById)
  await fastify.register(putPostById)
}
