import { FastifyPluginAsync } from 'fastify'

import { getPosts } from './get'
import { postPosts } from './post'
import { postsByIdService } from './[postId]'

export const postsService: FastifyPluginAsync = async (fastify) => {
  await fastify.register(getPosts)
  await fastify.register(postPosts)
  await fastify.register(postsByIdService)
}
