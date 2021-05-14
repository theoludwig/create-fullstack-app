import { FastifyPluginAsync, FastifySchema } from 'fastify'

import {
  paramsPostSchema,
  ParamsPostSchemaType,
  postSchema
} from '../../../models/Post'
import { fastifyErrors } from '../../../models/utils'
import prisma from '../../../tools/database/prisma'

const deletePostsSchema: FastifySchema = {
  description: 'Delete a post by its id',
  tags: ['posts'] as string[],
  params: paramsPostSchema,
  response: {
    200: postSchema,
    404: fastifyErrors[404],
    500: fastifyErrors[500]
  }
} as const

export const deletePostById: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Params: ParamsPostSchemaType }>({
    method: 'DELETE',
    url: '/posts/:postId',
    schema: deletePostsSchema,
    handler: async (request, reply) => {
      const { postId } = request.params
      const post = await prisma.post.findUnique({ where: { id: postId } })
      if (post == null) {
        throw fastify.httpErrors.notFound()
      }
      await prisma.post.delete({ where: { id: postId } })
      fastify.io.emit('posts', { action: 'delete', item: post })
      reply.statusCode = 200
      return post
    }
  })
}
