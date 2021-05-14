import { FastifyPluginAsync, FastifySchema } from 'fastify'

import {
  bodyPostOptionnalSchema,
  BodyPostOptionnalSchemaType,
  paramsPostSchema,
  ParamsPostSchemaType,
  postSchema
} from '../../../models/Post'
import { fastifyErrors } from '../../../models/utils'
import prisma from '../../../tools/database/prisma'

const putPostsSchema: FastifySchema = {
  description: 'Update a post by its id',
  tags: ['posts'] as string[],
  body: bodyPostOptionnalSchema,
  params: paramsPostSchema,
  response: {
    200: postSchema,
    404: fastifyErrors[404],
    500: fastifyErrors[500]
  }
} as const

export const putPostById: FastifyPluginAsync = async (fastify) => {
  fastify.route<{
    Body: BodyPostOptionnalSchemaType
    Params: ParamsPostSchemaType
  }>({
    method: 'PUT',
    url: '/posts/:postId',
    schema: putPostsSchema,
    handler: async (request, reply) => {
      const { title, content } = request.body
      const { postId } = request.params
      const post = await prisma.post.findUnique({ where: { id: postId } })
      if (post == null) {
        throw fastify.httpErrors.notFound()
      }
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: title ?? post.title,
          content: content ?? post.content
        }
      })
      fastify.io.emit('posts', { action: 'update', item: updatedPost })
      reply.statusCode = 200
      return updatedPost
    }
  })
}
